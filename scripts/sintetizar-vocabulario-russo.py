"""Gera os MP3 de estudo com Vosk-TTS local, voz 2, em diretório indicado.

Uso: python scripts/sintetizar-vocabulario-russo.py jobs.json caminho_do_modelo destino
Os pacotes vosk-tts e imageio-ffmpeg devem existir no ambiente de trabalho.
"""
import json
import pathlib
import subprocess
import sys
import tempfile

import imageio_ffmpeg
from vosk_tts import Model, Synth

jobs = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
modelo = pathlib.Path(sys.argv[2])
destino = pathlib.Path(sys.argv[3])
destino.mkdir(parents=True, exist_ok=True)
sintetizador = Synth(Model(model_path=str(modelo)))
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
with tempfile.TemporaryDirectory(dir=destino) as temporario:
    wav = pathlib.Path(temporario) / "voz.wav"
    for numero, item in enumerate(jobs, 1):
        saida = destino / item["arquivo"]
        if saida.exists() and saida.stat().st_size > 1000:
            continue
        sintetizador.synth(item["sintese"], str(wav), speaker_id=2)
        subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-i", str(wav), "-af", "adelay=150|150,apad=pad_dur=0.25", "-ac", "1", "-ar", "44100", "-b:a", "64k", str(saida)], check=True)
        print(f'{numero}/{len(jobs)} {item["txt"]}', flush=True)
