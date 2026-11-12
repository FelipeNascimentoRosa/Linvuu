import json,sys,urllib.parse,urllib.request
q=sys.argv[1]; n=int(sys.argv[2]) if len(sys.argv)>2 else 4
u="https://tatoeba.org/en/api_v0/search?from=spa&to=eng&orphans=no&unapproved=no&sort=relevance&query="+urllib.parse.quote(q)
d=json.load(urllib.request.urlopen(u))
for s in d['results'][:n]:
  tr=[t['text'] for g in s['translations'] for t in g if t.get('lang')=='eng']
  print(f"#{s['id']} {s['text']} | {tr[0] if tr else ''}")
