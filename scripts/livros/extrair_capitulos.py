#!/usr/bin/env python3
"""Ferramenta de autoria (rodar na máquina do autor): lê o PDF de um livro da Coleção Linvuu e grava cada capítulo
pedido em content/livros/<idioma>/cap-NN.json, com os blocos já separados (títulos, parágrafos, diálogo, tabelas, avisos).

Os PDFs do livro NÃO entram no repositório. Só o JSON dos capítulos liberados (amostra pública) é publicado.

Uso:
  python3 -I scripts/livros/extrair_capitulos.py --pdf Livro.pdf --idioma en --caps 1,2 [--saida content/livros]

O livro usa três fontes, e é isso que o extrator lê:
  Newsreader  títulos          SourceSans  português (explicação)          Literata  idioma estudado (frases, diálogos)
Trechos em Literata viram *assim* no texto (o site os destaca e liga o áudio); trechos riscados no PDF viram ~~assim~~.
"""
import argparse, json, re, sys
from collections import Counter
from pathlib import Path
import pdfplumber

VERDE = (0.118, 0.231, 0.184)      # cabeçalho de tabela
AVISO = (0.949, 0.871, 0.839)      # caixa ATENÇÃO
TOPO_UTIL, BASE_UTIL = 40, 795     # fora disso: rodapé

def cor(c): return tuple(round(x, 3) for x in c) if c else None
def perto(a, b, t=0.01): return a is not None and all(abs(x - y) < t for x, y in zip(a, b))
def fonte(c): return c['fontname'].split('+')[-1]
def eh_estrangeiro(c): return fonte(c).startswith('Literata')

def junta_linha(chars, riscos):
    """Texto de uma linha com *estrangeiro* e ~~riscado~~ marcados."""
    chars = sorted(chars, key=lambda c: c['x0'])
    saida, modo_e, modo_r, ult = [], False, False, None
    for c in chars:
        t = c['text']
        if t == ' ':
            if saida and saida[-1] != ' ': saida.append(' ')
            ult = c; continue
        if ult is not None and ult['text'] != ' ' and c['x0'] - ult['x1'] > 0.35 * c['size'] and saida and saida[-1] != ' ':
            saida.append(' ')
        e = eh_estrangeiro(c) and t.strip() != ''
        r = any(rs['x0'] - 0.5 <= (c['x0'] + c['x1']) / 2 <= rs['x1'] + 0.5 and c['top'] + 0.25 * c['size'] <= rs['top'] <= c['bottom'] - 0.1 * c['size'] for rs in riscos) and t.strip() != ''
        # fecha/abre marcadores
        if modo_r and not r: saida.append('~~'); modo_r = False
        if modo_e and not e and t.strip() != '': saida.append('*'); modo_e = False
        if r and not modo_r: saida.append('~~'); modo_r = True
        if e and not modo_e: saida.append('*'); modo_e = True
        saida.append(t)
        ult = c
    if modo_e: saida.append('*')
    if modo_r: saida.append('~~')
    s = ''.join(saida)
    s = re.sub(r'\*\s*\*', ' ', s)                 # *a* *b* -> junta
    s = re.sub(r'\*([^*]*?)\s+\*', r'*\1* ', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def normalizar(s):
    """Marcadores *…* e ~~…~~ colados ao texto; trechos vizinhos juntos; espaços limpos."""
    s = re.sub(r'\s+', ' ', s)
    for m in ('~~', r'\*'):
        mm = '~~' if m == '~~' else '*'
        s = re.sub(m + r'\s+' + m, ' ', s)                      # *a* *b* -> *a b*
        s = re.sub(m + r'([^*~]*?)' + m, lambda x: (' ' if x.group(1)[:1] == ' ' else '') + (mm + x.group(1).strip() + mm if x.group(1).strip() else '') + (' ' if x.group(1)[-1:] == ' ' else ''), s)
    s = re.sub(r'\s+([,.;:!?)”])', r'\1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def linhas_de_chars(chars):
    """Agrupa caracteres (inclusive os espaços do PDF) em linhas pela altura."""
    from pdfplumber.utils import cluster_objects
    out = []
    for grupo in cluster_objects(sorted(chars, key=lambda c: c['top']), 'top', 3.5):
        cs = sorted(grupo, key=lambda c: c['x0'])
        vis = [c for c in cs if c['text'].strip()]
        if not vis: continue
        out.append(dict(top=min(c['top'] for c in vis), bottom=max(c['bottom'] for c in vis), x0=min(c['x0'] for c in vis), chars=cs, vis=vis))
    return sorted(out, key=lambda l: l['top'])


def linhas_da_regiao(pg, bbox, riscos):
    """Linhas (top, x0, tamanho dominante, texto, primeiro_trecho_portugues?) dentro de bbox."""
    reg = pg.crop(bbox, strict=False) if bbox else pg
    out = []
    for ln in linhas_de_chars(reg.chars):
        cs = ln['chars']
        tam = Counter(round(c['size'], 1) for c in ln['vis']).most_common(1)[0][0]
        fam = Counter(fonte(c).split('-')[0] for c in ln['vis']).most_common(1)[0][0]
        out.append(dict(top=ln['top'], bottom=ln['bottom'], x0=ln['x0'], tam=tam, fam=fam, chars=ln['vis'], texto=junta_linha(cs, riscos)))
    return out

def tabelas_da_pagina(pg):
    """Tabelas desenhadas por retângulos: cabeçalho verde + linhas separadas por filetes escuros."""
    rs = pg.rects
    cab = [r for r in rs if perto(cor(r['non_stroking_color']), VERDE) and 14 < r['bottom'] - r['top'] < 40 and r['x1'] - r['x0'] < 500]
    grupos = {}
    for r in cab: grupos.setdefault(round(r['top']), []).append(r)
    tabs = []
    for top, cs in sorted(grupos.items()):
        cs = sorted(cs, key=lambda r: r['x0'])
        x0, x1 = cs[0]['x0'], cs[-1]['x1']
        base = max(r['bottom'] for r in cs)
        # filetes que fecham as linhas: finos, começam no x0 de uma coluna e terminam no x1 dela
        colunas = [(r['x0'], r['x1']) for r in cs]
        filetes = sorted(r['bottom'] for r in rs if r['bottom'] - r['top'] <= 1.6 and r['top'] >= base - 0.5 and any(abs(r['x0'] - a) < 1 and abs(r['x1'] - b) < 1 for a, b in colunas[:1]))
        # só os filetes contíguos (cada linha tem corpo preenchido logo acima)
        fim = base; limites = []
        for f in filetes:
            corpo = [r for r in rs if abs(r['x0'] - colunas[0][0]) < 1 and r['top'] >= fim - 0.6 and r['bottom'] >= f - 0.6 and r['top'] < f and r['bottom'] - r['top'] > 3]
            if not corpo and f - fim > 2: break
            limites.append((fim, f)); fim = f
        if limites: tabs.append(dict(x0=x0, x1=x1, top=top, base=base, cab=colunas, linhas=limites, fim=fim))
    return tabs

ESCURO = (0.114, 0.122, 0.11)
def tabelas_por_filetes(pg, ja):
    """Tabelas de 'erro típico': só filetes escuros (um segmento por coluna) e o cabeçalho em caixa-alta pequena acima do primeiro."""
    fin = [r for r in pg.rects if r['bottom'] - r['top'] <= 1.6 and perto(cor(r['non_stroking_color']), ESCURO) and r['x1'] - r['x0'] > 30]
    por = {}
    for r in fin: por.setdefault(round(r['top']), []).append(r)
    seps = []
    for top, rs in sorted(por.items()):
        rs = sorted(rs, key=lambda r: r['x0'])
        if len(rs) >= 2 and all(abs(rs[i + 1]['x0'] - rs[i]['x1']) < 2.5 for i in range(len(rs) - 1)):
            seps.append((top, tuple((round(r['x0']), round(r['x1'])) for r in rs)))
    tabs, i = [], 0
    while i < len(seps):
        j = i
        while j + 1 < len(seps) and seps[j + 1][1] == seps[i][1] and seps[j + 1][0] - seps[j][0] < 140: j += 1
        if j > i or True:
            cols = [(a, b) for a, b in seps[i][1]]
            if any(t['top'] <= seps[i][0] <= t['fim'] for t in ja): i = j + 1; continue
            cab_topo = TOPO_UTIL if seps[i][0] < 130 else seps[i][0] - 34
            tabs.append(dict(x0=cols[0][0], x1=cols[-1][1], top=cab_topo, base=seps[i][0], cab=cols, linhas=[(seps[k][0], seps[k + 1][0]) for k in range(i, j)], fim=seps[j][0]))
        i = j + 1
    return [t for t in tabs if t['linhas']]


def riscos_da_pagina(pg, tabs):
    """Filetes finos de 'riscado' (não são separadores de tabela)."""
    out = []
    for r in pg.rects:
        if r['bottom'] - r['top'] <= 1.6 and 8 < r['x1'] - r['x0'] < 300 and not perto(cor(r['non_stroking_color']), (0.718, 0.475, 0.122)):
            if any(any(abs(r['x0'] - a) < 1.5 and abs(r['x1'] - b) < 1.5 for a, b in t['cab']) for t in tabs): continue
            out.append(r)
    return out

def celula(pg, x0, x1, top, bot, riscos):
    ls = linhas_da_regiao(pg, (x0 + 1, top + 0.5, x1 - 1, bot - 0.5), riscos)
    return ' '.join(l['texto'] for l in ls if l['texto']).strip()

def blocos_da_pagina(pg, riscos_fixos=None):
    tabs = tabelas_da_pagina(pg)
    tabs += tabelas_por_filetes(pg, tabs)
    riscos = riscos_da_pagina(pg, tabs)
    itens = []   # (top, tipo, payload)
    # tabelas
    for t in tabs:
        cab = [celula(pg, a, b, t['top'], t['base'], riscos) for a, b in t['cab']]
        linhas = []
        for (a, b) in t['linhas']:
            linhas.append([celula(pg, ca, cb, a, b, riscos) for ca, cb in t['cab']])
        itens.append((t['top'], 'tabela', dict(cabecalho=cab, linhas=linhas)))
    excl = [(t['x0'] - 1, t['top'] - 1, t['x1'] + 1, t['fim'] + 1) for t in tabs]
    # caixas de aviso
    avisos = [r for r in pg.rects if perto(cor(r['non_stroking_color']), AVISO) and r['x1'] - r['x0'] > 300]
    for r in avisos:
        ls = linhas_da_regiao(pg, (r['x0'] + 4, r['top'] + 2, r['x1'] - 2, r['bottom'] - 2), riscos)
        corpo = [l for l in ls if l['texto'] and l['tam'] > 10]
        rot = next((l['texto'] for l in ls if l['tam'] <= 10), 'ATENÇÃO')
        itens.append((r['top'], 'aviso', dict(rotulo=rot.title() if rot.isupper() else rot, texto=juntar_paragrafos(corpo))))
        excl.append((r['x0'] - 1, r['top'] - 1, r['x1'] + 1, r['bottom'] + 1))
    # texto corrido: fora de tabelas e avisos, fora do rodapé
    base = pg.crop((0, TOPO_UTIL, pg.width, BASE_UTIL), strict=False)
    for e in excl:
        base = base.filter(lambda o, e=e: not (o.get('object_type') == 'char' and e[0] <= (o['x0'] + o['x1']) / 2 <= e[2] and e[1] <= (o['top'] + o['bottom']) / 2 <= e[3]))
    ls = []
    for ln in linhas_de_chars(base.chars):
        cs = ln['chars']
        tam = Counter(round(c['size'], 1) for c in ln['vis']).most_common(1)[0][0]
        fam = Counter(fonte(c).split('-')[0] for c in ln['vis']).most_common(1)[0][0]
        ls.append(dict(top=ln['top'], bottom=ln['bottom'], x0=ln['x0'], tam=tam, fam=fam, chars=ln['vis'], texto=junta_linha(cs, riscos)))
    for l in ls: itens.append((l['top'], 'linha', l))
    itens.sort(key=lambda i: i[0])
    return itens

def juntar_paragrafos(linhas):
    return re.sub(r'\s+', ' ', ' '.join(l['texto'] for l in linhas)).strip()

# ---------------------------------------------------------------- classificação das linhas em blocos
RE_H2 = re.compile(r'^\d{1,2}\.\s+\S')
RE_H3 = re.compile(r'^\d{1,2}\.\d{1,2}\s+\S')
RE_FALA = re.compile(r'^(?!Em portugu|Repare|Obs)([A-ZÀ-ÝА-Я][^:*]{0,26}):\s*(.*)$')

def montar(paginas):
    """paginas: lista de (num_pag, itens). Devolve blocos do capítulo."""
    blocos, para, ultimo_bottom, ultimo_x0, em_cena = [], None, None, None, False
    ult_pag_tabela = None

    def fecha():
        nonlocal para
        if para and para['texto'].strip():
            blocos.append(para)
        para = None

    for (npag, itens) in paginas:
        ultimo_bottom = None
        primeira_da_pagina = True
        for (_, tipo, d) in itens:
            if tipo == 'tabela':
                fecha(); primeira_da_pagina = False
                cab_txt = ' '.join(d['cabecalho'])
                if blocos and blocos[-1]['t'] == 'tabela' and len(blocos[-1]['cabecalho']) == len(d['cabecalho']) and cab_txt != cab_txt.upper() and cab_txt.strip():
                    blocos[-1]['linhas'] += [d['cabecalho']] + d['linhas']           # continuação: o "cabeçalho" é a primeira linha
                elif blocos and blocos[-1]['t'] == 'tabela' and blocos[-1]['cabecalho'] == d['cabecalho'] and npag != ult_pag_tabela: blocos[-1]['linhas'] += d['linhas']
                else: blocos.append(dict(t='tabela', **d))
                ult_pag_tabela = npag; continue
            if tipo == 'aviso':
                fecha(); blocos.append(dict(t='aviso', rotulo=d['rotulo'], texto=d['texto'])); continue
            l = d; txt = l['texto']
            if not txt: continue
            tam, fam = l['tam'], l['fam']
            plano = txt.replace('*', '').replace('~~', '').strip()
            # títulos
            if fam.startswith('Newsreader'):
                fecha()
                if tam >= 30:
                    if blocos and blocos[-1]['t'] == 'h1': blocos[-1]['texto'] += ' ' + plano
                    else: blocos.append(dict(t='h1', texto=plano))
                elif tam >= 20:
                    if blocos and blocos[-1]['t'] == 'h2' and not RE_H2.match(plano): blocos[-1]['texto'] += ' ' + plano
                    else: blocos.append(dict(t='h2', texto=plano))
                elif tam >= 16:
                    blocos.append(dict(t='h3', texto=plano))
                else:
                    if blocos and blocos[-1]['t'] == 'h4' and l['top'] - (ultimo_bottom or 0) < 6: blocos[-1]['texto'] += ' ' + plano
                    else: blocos.append(dict(t='h4', texto=plano))
                ultimo_bottom = l['bottom']; em_cena = False
                continue
            # número de passo (dígito grande ao lado de título h4)
            if tam >= 16 and fam.startswith('SourceSans') and re.fullmatch(r'\d+', plano):
                continue
            # rótulo em caixa-alta pequena (CENA, ATENÇÃO, EM 30 SEGUNDOS ...)
            if tam <= 10 and plano.isupper() and len(plano) < 40:
                fecha(); blocos.append(dict(t='rotulo', texto=plano.title() if plano != 'CENA' else 'Cena')); em_cena = (plano == 'CENA'); ultimo_bottom = l['bottom']; continue
            gap = (l['top'] - ultimo_bottom) if ultimo_bottom is not None else 999
            nova = gap > 0.55 * tam + 5 or para is None
            if primeira_da_pagina and para and para['t'] == 'p' and not re.search(r'[.!?:;”»)]\s*$', para['texto'].replace('*', '')) and re.match(r'^\*?[a-zà-ÿ(“]', txt):
                nova = False                       # o parágrafo continua na página seguinte
            primeira_da_pagina = False
            # diálogo
            if em_cena:
                m = RE_FALA.match(txt)
                primeiro_pt = l['chars'][0]['fontname'].split('+')[-1].startswith('SourceSans')
                if m and primeiro_pt:
                    if para and para['t'] == 'dialogo': para['falas'].append(dict(quem=m.group(1).strip(), texto=m.group(2).strip()))
                    else:
                        fecha(); para = dict(t='dialogo', falas=[dict(quem=m.group(1).strip(), texto=m.group(2).strip())], texto='x')
                elif para and para['t'] == 'dialogo' and not txt.startswith('Em portugu') and gap < 0.55 * tam + 5 + 4:
                    para['falas'][-1]['texto'] = (para['falas'][-1]['texto'] + ' ' + txt).strip()
                else:
                    em_cena = False
                    fecha(); para = dict(t='p', texto=txt)
                ultimo_bottom = l['bottom']; continue
            # itens numerados soltos ("3." sozinho)
            if re.fullmatch(r'\d{1,2}\.', plano):
                fecha(); para = dict(t='item', n=int(plano[:-1]), texto=''); ultimo_bottom = l['bottom']; continue
            if para and para['t'] == 'item' and not nova or (para and para['t'] == 'item' and para['texto'] == ''):
                para['texto'] = (para['texto'] + ' ' + txt).strip(); ultimo_bottom = l['bottom']; continue
            # bullet
            if re.match(r'^[•●▪◦·]\s*', plano):
                fecha(); para = dict(t='li', texto=re.sub(r'^[•●▪◦·]\s*', '', txt)); ultimo_bottom = l['bottom']; continue
            if nova:
                fecha(); para = dict(t='p', texto=txt)
            else:
                junta = '' if re.search(r'\w-\*?$', para['texto']) and re.match(r'^\*?[A-Za-zÀ-ÿ]', txt) else ' '
                para['texto'] = (para['texto'] + junta + txt).strip() if para.get('t') != 'dialogo' else para['texto']
            ultimo_bottom = l['bottom']
    fecha()
    # limpeza final: remove hífen de quebra "palavra- continuação" e espaços duplos
    for b in blocos:
        if isinstance(b.get('texto'), str): b['texto'] = normalizar(b['texto'])
        for f in b.get('falas', []): f['texto'] = normalizar(f['texto'])
        if b['t'] == 'tabela':
            b['cabecalho'] = [normalizar(c) for c in b['cabecalho']]
            b['linhas'] = [[normalizar(c) for c in r] for r in b['linhas']]
    return corrigir_niveis(blocos)

def corrigir_niveis(blocos):
    """Sem saltos de nível nos títulos: cada título desce no máximo um nível em
    relação ao título-pai (o anterior de nível estritamente menor; a raiz é o h1
    do capítulo). A classificação por tamanho de fonte marcava as subsecções da
    secção "5. Por dentro" dos livros ES/FR como h4 sob um h2 — aqui nascem já
    como h3. Títulos irmãos mantêm o nível entre si e um h4 sob um h3 legítimo
    (os passos numerados do livro EN) não muda. Mesma regra de
    normalizarNiveis em src/lib/livros.ts."""
    pilha = []  # (nível original, nível efetivo)
    for b in blocos:
        if b['t'] not in ('h2', 'h3', 'h4'): continue
        orig = int(b['t'][1])
        while pilha and pilha[-1][0] >= orig: pilha.pop()
        pai = pilha[-1][1] if pilha else 1
        efetivo = min(orig, pai + 1)
        pilha.append((orig, efetivo))
        if efetivo != orig: b['t'] = f'h{efetivo}'
    return blocos

def capitulos_do_pdf(pdf, limite=90):
    """Páginas em que cada capítulo começa (título 'Capítulo N.' em fonte grande)."""
    ini = {}
    for i, pg in enumerate(pdf.pages[:limite]):
        if i < 5: continue
        ch = [c for c in pg.chars if c['size'] > 30]
        if not ch: continue
        txt = ''.join(c['text'] for c in sorted(ch, key=lambda c: (round(c['top']), c['x0'])))
        m = re.match(r'(?:Cap[ií]tulo|Aula|Lição|Unidade)\s*(\d+)', txt)
        if m: ini[int(m.group(1))] = i
    return ini

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--pdf', required=True); ap.add_argument('--idioma', required=True); ap.add_argument('--caps', required=True)
    ap.add_argument('--saida', default='content/livros'); ap.add_argument('--limite', type=int, default=90, help='quantas páginas do PDF examinar (livros inteiros: use o total)')
    a = ap.parse_args()
    pdf = pdfplumber.open(a.pdf)
    ini = capitulos_do_pdf(pdf, a.limite)
    if not ini: sys.exit('não achei os inícios de capítulo')
    ordem = sorted(ini)
    for n in [int(x) for x in a.caps.split(',')]:
        if n not in ini: print('capítulo', n, 'não encontrado'); continue
        p0 = ini[n]; seg = [ini[k] for k in ordem if ini[k] > p0]
        p1 = (seg[0] if seg else len(pdf.pages)) - 1
        pags = [(i + 1, blocos_da_pagina(pdf.pages[i])) for i in range(p0, p1 + 1)]
        blocos = montar(pags)
        h1 = next((b['texto'] for b in blocos if b['t'] == 'h1'), f'Capítulo {n}')
        nivel = (re.search(r'\((A1|A2|B1|B2|A1–A2)\)\s*$', h1) or [None, ''])[1]
        doc = dict(n=n, idioma=a.idioma, titulo=re.sub(r'\s*\((A1|A2|B1|B2|A1–A2)\)\s*$', '', re.sub(r'^Cap[ií]tulo\s*\d+\.\s*', '', h1)), nivel=nivel, paginas=[p0 + 1, p1 + 1], blocos=[b for b in blocos if b['t'] != 'h1'])
        dest = Path(a.saida) / a.idioma; dest.mkdir(parents=True, exist_ok=True)
        (dest / f'cap-{n:02d}.json').write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding='utf-8')
        print(f'capítulo {n}: págs {p0+1}-{p1+1}, {len(doc["blocos"])} blocos -> {dest}/cap-{n:02d}.json')

if __name__ == '__main__':
    main()
