"""Auditoria de configuração: sem documentos, usuários ou valores de chaves."""
import argparse
import datetime
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import urllib.error
import urllib.parse
import urllib.request

PROJECT = "linvuu"
NUMBER = "982052790317"
ROOTS = {
    "project": "https://cloudresourcemanager.googleapis.com/v1/",
    "firestore": "https://firestore.googleapis.com/v1/",
    "rules": "https://firebaserules.googleapis.com/v1/",
    "iam": "https://iam.googleapis.com/v1/",
    "keys": "https://apikeys.googleapis.com/v2/",
}


class Reader:
    def __init__(self, token, out, opener=urllib.request.urlopen):
        self.token, self.out, self.opener = token, Path(out), opener
        self.out.mkdir(parents=True, exist_ok=True)
        self.failures = []

    def request(self, service, path, label, body=None, method=None):
        # Os chamadores abaixo definem caminhos de metadados, nunca de documentos.
        url = ROOTS[service] + path
        encoded = None if body is None else json.dumps(body).encode()
        req = urllib.request.Request(url, data=encoded, method=method, headers={
            "Authorization": "Bearer " + self.token,
            "Content-Type": "application/json",
        })
        try:
            with self.opener(req, timeout=30) as response:
                data = json.load(response)
        except urllib.error.HTTPError as error:
            data = {"httpStatus": error.code, "error": error.read().decode(errors="replace")}
            self.failures.append(label)
        except (OSError, ValueError) as error:
            # Exceções não incluem a requisição nem seus cabeçalhos.
            data = {"errorType": type(error).__name__}
            self.failures.append(label)
        safe = json.dumps(data, ensure_ascii=False, indent=2).replace(self.token, "[REDACTED]")
        (self.out / (label + ".json")).write_text(safe + "\n", encoding="utf-8")
        return data

    def pages(self, service, path, field, label):
        items, page, seen = [], 1, set()
        while True:
            data = self.request(service, path, label + "-" + str(page))
            items.extend(data.get(field, []))
            token = data.get("nextPageToken")
            if not token:
                return items
            if token in seen or page >= 100:
                self.failures.append(label + "-pagination")
                return items
            seen.add(token)
            path = path.split("?", 1)[0] + "?" + urllib.parse.urlencode({"pageToken": token})
            page += 1


def collect(reader, rules_path):
    project = reader.request("project", "projects/" + PROJECT, "projeto")
    if str(project.get("projectNumber")) != NUMBER:
        raise RuntimeError("Projeto não confirmado: esperado linvuu / 982052790317; coleta interrompida.")
    reader.request("project", "projects/" + PROJECT + ":getIamPolicy", "iam-projeto", {"options": {"requestedPolicyVersion": 3}})
    databases = reader.request("firestore", "projects/" + PROJECT + "/databases", "bancos")
    if databases.get("unreachable"):
        reader.failures.append("bancos-unreachable")
    releases = reader.pages("rules", "projects/" + PROJECT + "/releases", "releases", "releases")
    comparison = {"status": "release-padrao-nao-encontrada"}
    for release in releases:
        name = release.get("rulesetName", "")
        if not re.fullmatch(r"projects/(?:linvuu|982052790317)/rulesets/[A-Za-z0-9_-]+", name):
            reader.failures.append("ruleset-name-invalido")
            continue
        label = "ruleset-" + hashlib.sha256(name.encode()).hexdigest()[:16]
        rules = reader.request("rules", name, label)
        if release.get("name", "").endswith("/releases/cloud.firestore"):
            files = rules.get("source", {}).get("files", [])
            if len(files) == 1 and isinstance(files[0].get("content"), str):
                published = files[0]["content"].encode()
                versioned = Path(rules_path).read_bytes()
                comparison = {"status": "comparado", "rulesetName": name,
                    "publishedSha256": hashlib.sha256(published).hexdigest(),
                    "versionedSha256": hashlib.sha256(versioned).hexdigest(),
                    "exactMatch": published == versioned}
            else:
                reader.failures.append("ruleset-padrao-nao-legivel")
    if comparison["status"] != "comparado":
        reader.failures.append("comparacao-regras-pendente")
    accounts = reader.pages("iam", "projects/" + PROJECT + "/serviceAccounts", "accounts", "contas-servico")
    for account in accounts:
        email = account.get("email", "")
        if not re.fullmatch(r"[A-Za-z0-9_.+-]+@[A-Za-z0-9.-]+\.gserviceaccount\.com", email):
            reader.failures.append("conta-servico-invalida")
            continue
        path = "projects/" + PROJECT + "/serviceAccounts/" + urllib.parse.quote(email, safe="")
        label = "sa-" + hashlib.sha256(email.encode()).hexdigest()[:16]
        reader.request("iam", path + ":getIamPolicy?options.requestedPolicyVersion=3", label + "-iam", method="POST")
        # Só metadados; nunca keys.getKeyString nem criação/download de chaves.
        reader.request("iam", path + "/keys", label + "-chaves")
    reader.pages("keys", "projects/" + PROJECT + "/locations/global/keys", "keys", "api-keys-metadados")
    manifest = {"projectId": PROJECT, "projectNumber": NUMBER,
        "collectedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "gitSha": os.environ.get("GITHUB_SHA"), "runId": os.environ.get("GITHUB_RUN_ID"),
        "databasesReturned": len(databases.get("databases", [])), "rulesComparison": comparison,
        "readFailures": reader.failures,
        "limits": ["Sem dados de alunos, tokens de usuários ou chaves privadas.",
                   "Sem políticas de organização/pasta; não prova acesso efetivo completo.",
                   "Comparação textual exata não avalia sozinha a segurança das regras."]}
    (reader.out / "resultado.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    return manifest


def validate_github_context(environ, event):
    if environ.get("GITHUB_REPOSITORY") != "FelipeNascimentoRosa/Linvuu" or environ.get("GITHUB_REF") != "refs/heads/main":
        raise SystemExit("Auditoria autenticada permitida apenas na main de FelipeNascimentoRosa/Linvuu.")
    if event.get("repository", {}).get("private") is not True:
        raise SystemExit("Coleta detalhada bloqueada: repositório privado não confirmado.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", default="auditoria-firebase")
    parser.add_argument("--rules", default="firestore.rules")
    args = parser.parse_args()
    if os.environ.get("GITHUB_ACTIONS") == "true":
        try:
            event = json.loads(Path(os.environ["GITHUB_EVENT_PATH"]).read_text())
        except (OSError, ValueError, KeyError):
            raise SystemExit("Evento GitHub não legível; nenhuma coleta iniciada.")
        validate_github_context(os.environ, event)
    result = {"status": "coleta-interrompida"}
    try:
        token = subprocess.check_output(["gcloud", "auth", "print-access-token"], text=True).strip()
        if not token:
            raise RuntimeError("Token indisponível")
        result = collect(Reader(token, args.out), args.rules)
        # Apenas resumo sem credenciais ou conteúdo de políticas no log.
        print(json.dumps(result, ensure_ascii=False))
        return 2 if result["readFailures"] else (1 if not result["rulesComparison"]["exactMatch"] else 0)
    except (RuntimeError, subprocess.CalledProcessError) as error:
        Path(args.out).mkdir(parents=True, exist_ok=True)
        (Path(args.out) / "interrompido.json").write_text(json.dumps({"status": "coleta-interrompida", "reason": str(error)}))
        print("Coleta interrompida; conferir relatório e autenticação. Não é aprovação de segurança.")
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
