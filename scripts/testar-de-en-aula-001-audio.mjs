import fs from 'node:fs'; import assert from 'node:assert/strict';
const a=JSON.parse(fs.readFileSync('content/idiomas/de/edicoes/en/aula-001.json'));const found=new Set();
function scan(x){if(Array.isArray(x))return x.forEach(scan);if(x&&typeof x==='object') for(const [k,v] of Object.entries(x)){if(k==='audio'&&typeof v==='string'&&v.trim())found.add(v); else scan(v)}}scan(a);
function hash(t){let h=0x811c9dc5;for(const c of Buffer.from(t.normalize('NFC').replace(/\u0301/g,'').trim(),'utf8')){h^=c;h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0')}
const idx=JSON.parse(fs.readFileSync('public/audio/v2/de/index.json'));const list=new Set(Array.isArray(idx)?idx:Object.keys(idx));
for(const t of found){const h=hash(t);assert.ok(list.has(h),`audio not indexed ${t}`);assert.ok(fs.existsSync(`public/audio/v2/de/${h}.mp3`),`missing ${t}`)}console.log('ok:',found.size,'audios públicos');
