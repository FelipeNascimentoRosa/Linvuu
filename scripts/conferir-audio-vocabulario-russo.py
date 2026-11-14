"""Conferência automática auxiliar; não substitui escuta humana de sotaque e tonicidade."""
import json
import pathlib
import re
import subprocess
import sys
import unicodedata

import imageio_ffmpeg
import numpy as np
from faster_whisper import WhisperModel

jobs = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
audios = pathlib.Path(sys.argv[2])
saida = pathlib.Path(sys.argv[3])
modelo = WhisperModel("small", device="cpu", compute_type="int8", download_root=sys.argv[4])
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

def normalizar(s):
    s = unicodedata.normalize("NFD", s.lower().replace("ё", "е"))
    return re.sub(r"[^а-яa-z0-9]", "", s)

relatorio = []
for numero, item in enumerate(jobs, 1):
    dados = subprocess.run([ffmpeg, "-loglevel", "error", "-i", str(audios / item["arquivo"]), "-ar", "16000", "-ac", "1", "-f", "s16le", "-"], check=True, capture_output=True).stdout
    amostras = np.frombuffer(dados, dtype=np.int16).astype(np.float32) / 32768.0
    segmentos, _ = modelo.transcribe(amostras, language="ru", beam_size=5, vad_filter=False)
    texto = " ".join(segmento.text.strip() for segmento in segmentos).strip()
    relatorio.append({**item, "ouvido": texto, "igual": normalizar(texto) == normalizar(item["txt"])})
    if numero % 20 == 0:
        print(f'{numero}/{len(jobs)} processados', flush=True)
    saida.write_text(json.dumps(relatorio, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Reconhecidos exatamente: {sum(x['igual'] for x in relatorio)}/{len(relatorio)}", flush=True)
