"""Preparação única da auditoria GitHub OIDC. Sem --apply, apenas mostra o plano."""
import argparse
import json
import subprocess

PROJECT = "linvuu"
NUMBER = "982052790317"
POOL = "linvuu-auditoria"
PROVIDER = "github-main"
SA = "auditoria-github@linvuu.iam.gserviceaccount.com"
ROLE = "linvuuAuditoriaConfig"
PRINCIPAL = "principalSet://iam.googleapis.com/projects/982052790317/locations/global/workloadIdentityPools/linvuu-auditoria/attribute.repository_id/1400441159"
MAPPING = "google.subject=assertion.sub,attribute.repository_id=assertion.repository_id"
CONDITION = "assertion.repository_id=='1400441159' && assertion.repository_owner_id=='204771338' && assertion.ref=='refs/heads/main' && assertion.workflow_ref=='FelipeNascimentoRosa/Linvuu/.github/workflows/auditoria-firebase.yml@refs/heads/main'"
PERMISSIONS = [
    "resourcemanager.projects.get", "resourcemanager.projects.getIamPolicy",
    "firebaserules.releases.get", "firebaserules.releases.list", "firebaserules.rulesets.get",
    "datastore.databases.get", "datastore.databases.list",
    "iam.serviceAccounts.get", "iam.serviceAccounts.list", "iam.serviceAccounts.getIamPolicy",
    "iam.serviceAccountKeys.get", "iam.serviceAccountKeys.list",
    "apikeys.keys.get", "apikeys.keys.list",
]


def run(args, missing=False):
    process = subprocess.run(["gcloud", *args, "--format=json", "--quiet"], text=True, capture_output=True)
    if process.returncode:
        if missing and "NOT_FOUND" in process.stderr:
            return None
        raise RuntimeError(process.stderr.strip())
    return json.loads(process.stdout) if process.stdout.strip() else {}


def configure():
    account = subprocess.check_output(["gcloud", "auth", "list", "--filter=status:ACTIVE", "--format=value(account)"], text=True).strip()
    if account != "hello.linvuu@gmail.com":
        raise RuntimeError("Execute com hello.linvuu@gmail.com no Cloud Shell. Nenhuma alteração iniciada.")
    project = run(["projects", "describe", PROJECT])
    if str(project.get("projectNumber")) != NUMBER:
        raise RuntimeError("ID/número do projeto não correspondem; nenhuma alteração iniciada.")
    run(["services", "enable", "iam.googleapis.com", "iamcredentials.googleapis.com", "sts.googleapis.com", "--project=" + PROJECT])
    role = run(["iam", "roles", "describe", ROLE, "--project=" + PROJECT], missing=True)
    if role is None:
        run(["iam", "roles", "create", ROLE, "--project=" + PROJECT, "--title=Linvuu auditoria de configuracao", "--stage=GA", "--permissions=" + ",".join(PERMISSIONS)])
    elif set(role.get("includedPermissions", [])) != set(PERMISSIONS) or role.get("deleted") or role.get("stage") != "GA":
        raise RuntimeError("Papel existente diverge do plano. Revisar manualmente; não foi sobrescrito.")
    pool_args = ["iam", "workload-identity-pools"]
    pool = run([*pool_args, "describe", POOL, "--project=" + PROJECT, "--location=global"], missing=True)
    if pool is None:
        run([*pool_args, "create", POOL, "--project=" + PROJECT, "--location=global", "--display-name=Linvuu auditoria GitHub"])
    elif pool.get("state") != "ACTIVE" or pool.get("disabled", False):
        raise RuntimeError("Pool existente não está ativo; não foi reativado automaticamente.")
    provider_args = [*pool_args, "providers"]
    providers = run([*provider_args, "list", "--project=" + PROJECT, "--location=global", "--workload-identity-pool=" + POOL])
    if providers and any(item.get("name", "").rsplit("/", 1)[-1] != PROVIDER for item in providers):
        raise RuntimeError("Pool contém outros providers. Revisar antes de compartilhar a confiança da conta.")
    provider = run([*provider_args, "describe", PROVIDER, "--project=" + PROJECT, "--location=global", "--workload-identity-pool=" + POOL], missing=True)
    if provider is None:
        run([*provider_args, "create-oidc", PROVIDER, "--project=" + PROJECT, "--location=global", "--workload-identity-pool=" + POOL,
             "--issuer-uri=https://token.actions.githubusercontent.com", "--attribute-mapping=" + MAPPING, "--attribute-condition=" + CONDITION])
    elif (provider.get("disabled", False) or provider.get("attributeCondition") != CONDITION
          or provider.get("oidc", {}).get("issuerUri") != "https://token.actions.githubusercontent.com"
          or provider.get("oidc", {}).get("allowedAudiences", [])
          or provider.get("attributeMapping") != {"google.subject": "assertion.sub", "attribute.repository_id": "assertion.repository_id"}):
        raise RuntimeError("Provider existente diverge do plano; não foi sobrescrito.")
    sa = run(["iam", "service-accounts", "describe", SA, "--project=" + PROJECT], missing=True)
    if sa is None:
        run(["iam", "service-accounts", "create", "auditoria-github", "--project=" + PROJECT, "--display-name=Linvuu auditoria GitHub"])
    elif sa.get("disabled", False):
        raise RuntimeError("Conta existente desativada; não foi reativada.")
    sa_policy = run(["iam", "service-accounts", "get-iam-policy", SA, "--project=" + PROJECT])
    for binding in sa_policy.get("bindings", []):
        if (binding.get("role") != "roles/iam.workloadIdentityUser"
            or set(binding.get("members", [])) - {PRINCIPAL}):
            raise RuntimeError("Conta possui vínculos de confiança diferentes. Revisar antes de atribuir o papel de auditoria.")
    policy = run(["projects", "get-iam-policy", PROJECT])
    existing_roles = {binding["role"] for binding in policy.get("bindings", [])
                      if "serviceAccount:" + SA in binding.get("members", [])}
    if existing_roles - {"projects/linvuu/roles/" + ROLE}:
        raise RuntimeError("A conta de auditoria tem outros papéis no projeto. Revisar antes de autorizar a federação.")
    run(["projects", "add-iam-policy-binding", PROJECT, "--member=serviceAccount:" + SA,
         "--role=projects/linvuu/roles/" + ROLE, "--condition=None"])
    run(["iam", "service-accounts", "add-iam-policy-binding", SA, "--project=" + PROJECT,
         "--member=" + PRINCIPAL, "--role=roles/iam.workloadIdentityUser", "--condition=None"])
    print("Configuração aplicada. Não foram criadas chaves. Executar o workflow manual e conferir o resultado antes de declarar conexão verificada.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Cria recursos e vínculos IAM descritos no plano")
    args = parser.parse_args()
    if args.apply:
        raise SystemExit("Instalador OIDC antigo aposentado. Nao aplique ao repositorio publico. Use o instalador atualizado de FelipeNascimentoRosa/Linvuu-Auditoria-Firebase.")
    if not args.apply:
        print(json.dumps({"projectId": PROJECT, "projectNumber": NUMBER, "accountRequired": "hello.linvuu@gmail.com",
            "serviceAccount": SA, "pool": POOL, "provider": PROVIDER, "condition": CONDITION,
            "permissions": PERMISSIONS, "changes": ["Habilitar IAM, IAM Credentials e STS", "Criar papel de leitura, pool, provider e conta de auditoria", "Autorizar somente workflow específico na main e vincular papel de leitura"],
            "limits": "Não dá acesso a documentos, usuários, valores de API keys, chaves privadas, deploy ou alterações IAM pelo workflow."}, ensure_ascii=False, indent=2))
        return
    configure()


if __name__ == "__main__":
    main()
