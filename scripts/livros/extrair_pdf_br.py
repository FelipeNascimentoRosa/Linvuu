#!/usr/bin/env python3
"""Ferramenta de autoria: extrai capítulos (Lessons) do livro «Olá Portuguese» (português para quem fala inglês,
volume 1, A1–A2) para content/livros/br/cap-NN.json. Reaproveita o leitor de extrair_capitulos.py; muda só a forma
de achar o início de cada lição: o livro em inglês abre cada uma com o rótulo espaçado «L E S S O N N».

Uso: python3 -I scripts/livros/extrair_pdf_br.py --pdf Ola-Portuguese.pdf --caps 1,2 [--saida content/livros]
O PDF não entra no repositório; só os capítulos de amostra (1 e 2) são publicados."""
import argparse, json, re, subprocess, sys
from pathlib import Path
import pdfplumber
sys.path.insert(0, str(Path(__file__).resolve().parent))
from extrair_capitulos import blocos_da_pagina, montar  # noqa: E402

def licoes_do_pdf(pdf):
    ini = {}
    for i, pg in enumerate(pdf.pages):
        if i < 10: continue
        topo = pg.crop((0, 0, pg.width, 200), strict=False)
        txt = re.sub(r'\s+', '', topo.extract_text() or '')
        m = re.match(r'LESSON(\d{1,2})', txt)
        if m and int(m.group(1)) not in ini: ini[int(m.group(1))] = i
    return ini

NIVEIS = {}  # do mapa do livro (0.7): lição -> nível

def ler_niveis(pdf_path):
    txt = subprocess.run(['pdftotext', '-f', '11', '-l', '12', '-layout', pdf_path, '-'], capture_output=True, text=True).stdout
    for ln in txt.splitlines():
        m = re.search(r'\s(\d{1,2})\s{2,}.*?\s(A1–A2|A2–B1|A1|A2|B1)\s*$', ln) or re.search(r'^\s+(\d{1,2})\s{2,}(A1|A2)\s*$', ln)
        if m: NIVEIS[int(m.group(1))] = m.group(2)

def sumario(pdf_path):
    """Títulos das lições pelo Sumário (págs. 2–7); o título às vezes quebra para a linha de cima ou de baixo."""
    ls = subprocess.run(['pdftotext', '-f', '2', '-l', '7', '-layout', pdf_path, '-'], capture_output=True, text=True).stdout.splitlines()
    itens = []
    for i, ln in enumerate(ls):
        m = re.match(r'^\s*L\s*E\s*S\s*S\s*O\s*N\s*((?:\d\s?){1,2})\s*(.*?)\s*(\d{1,3})?\s*$', ln)
        if not m: continue
        n = int(m.group(1).replace(' ', '')); titulo = m.group(2).strip(); pg = m.group(3)
        if not titulo and i > 0 and ls[i - 1].strip() and not re.match(r'^\s*\d+\.\d+', ls[i - 1]): titulo = ls[i - 1].strip()
        j = i + 1
        while j < len(ls) and ls[j].strip() and not re.match(r'^\s*\d+\.\d+\s', ls[j]): titulo += ' ' + ls[j].strip(); j += 1
        itens.append(dict(n=n, titulo=re.sub(r'\s+', ' ', titulo).strip().rstrip(','), nivel=NIVEIS.get(n, ''), pagina=int(pg) if pg else None))
    return itens

FALA = re.compile(r'([A-ZÀ-Ý][\wÀ-ÿ]+):\s*(\*[^*]+\*)')

def ajustar(blocos):
    """Acertos próprios deste livro: título da lição sai dos blocos, diálogo vira Cena, rótulos colados à tabela voltam ao lugar."""
    titulo = ''
    if blocos and blocos[0]['t'] == 'rotulo' and blocos[0]['texto'].lower().startswith('lesson'): blocos = blocos[1:]
    if blocos and blocos[0]['t'] == 'h2': titulo = blocos[0]['texto']; blocos = blocos[1:]
    out = []
    for b in blocos:
        if b['t'] == 'h3': b = dict(b, t='h2')
        elif b['t'] == 'h4': b = dict(b, t='h3')
        if b['t'] == 'rotulo' and re.fullmatch(r'\w{1,5}\.', b['texto']): continue          # sobra de leitura («Lees.»)
        if b['t'] == 'p' and len(FALA.findall(b['texto'])) >= 2 and out and out[-1]['t'] == 'rotulo' and out[-1]['texto'] == 'Dialogue':
            out.append(dict(t='dialogo', falas=[dict(quem=q, texto=t) for q, t in FALA.findall(b['texto'])])); continue
        if b['t'] == 'tabela':
            c0 = b['cabecalho'][0]
            if c0.upper().startswith('TYPICAL MISTAKES '):
                out.append(dict(t='rotulo', texto='Typical Mistakes')); b['cabecalho'][0] = c0[len('TYPICAL MISTAKES '):]
            elif out and out[-1]['t'] == 'rotulo' and c0 != c0.upper():
                rot = out.pop()['texto']; partes = re.split(r'\s+(?=In Portuguese$)', rot) if rot.endswith('In Portuguese') else re.split(r'\s+(?=Portuguese$)', rot)
                b = dict(b, cabecalho=partes if len(partes) == len(b['cabecalho']) else ['', ''][:len(b['cabecalho'])], linhas=[b['cabecalho']] + b['linhas'])
        out.append(b)
    return titulo, out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--pdf', required=True); ap.add_argument('--caps', required=True); ap.add_argument('--saida', default='content/livros')
    a = ap.parse_args()
    pdf = pdfplumber.open(a.pdf)
    ini = licoes_do_pdf(pdf); ler_niveis(a.pdf)
    if not ini: sys.exit('não achei os inícios das lições')
    ordem = sorted(ini)
    for n in [int(x) for x in a.caps.split(',')]:
        p0 = ini[n]; seg = [ini[k] for k in ordem if ini[k] > p0]; p1 = (seg[0] if seg else len(pdf.pages)) - 1
        blocos = montar([(i + 1, blocos_da_pagina(pdf.pages[i])) for i in range(p0, p1 + 1)])
        titulo, blocos = ajustar([b for b in blocos if b['t'] != 'h1'])
        doc = dict(n=n, idioma='br', titulo=titulo or f'Lesson {n}', nivel=NIVEIS.get(n, ''), paginas=[p0 + 1, p1 + 1], blocos=blocos)
        dest = Path(a.saida) / 'br'; dest.mkdir(parents=True, exist_ok=True)
        (dest / f'cap-{n:02d}.json').write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding='utf-8')
        print(f'lição {n}: págs {p0+1}-{p1+1}, {len(doc["blocos"])} blocos')
    sm = sumario(a.pdf)
    (Path(a.saida) / 'br' / 'sumario.json').write_text(json.dumps(sm, ensure_ascii=False, indent=1), encoding='utf-8')
    print('sumário:', len(sm), 'lições')

if __name__ == '__main__':
    main()
