"""Busca pares espanhol–inglês no arquivo local do Tatoeba (CC BY 2.0 FR).
uso: python3 fontes-publicas/tatoeba-es/buscar.py "tarda" "en llegar" [-n 10]
Cada linha: id | frase em espanhol | tradução inglesa. Crédito: tatoeba.org/sentences/show/<id>."""
import bz2,sys,os
args=[a for a in sys.argv[1:] if not a.startswith('-n')]; n=10
if '-n' in sys.argv: n=int(sys.argv[sys.argv.index('-n')+1]); args=[a for a in args if a!=str(n)]
termos=[a.lower() for a in args]
p=os.path.join(os.path.dirname(__file__),'spa-eng.tsv.bz2'); k=0
for l in bz2.open(p,'rt'):
    i,es,en=l.rstrip('\n').split('\t')
    if all(t in es.lower() for t in termos):
        print(f'#{i} | {es} | {en}'); k+=1
        if k>=n: break
