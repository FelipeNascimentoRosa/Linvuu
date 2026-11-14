"""Tenta melhorar amostras divergentes na transcrição automática, sem trocar a voz."""
import json
import pathlib
import re
import subprocess
import sys
import tempfile
import unicodedata
import imageio_ffmpeg
import numpy as np
from faster_whisper import WhisperModel
from vosk_tts import Model, Synth

relatorio = pathlib.Path(sys.argv[1])
audios = pathlib.Path(sys.argv[2])
modelo = Synth(Model(model_path=sys.argv[3]))
whisper = WhisperModel("small", device="cpu", compute_type="int8", download_root=sys.argv[4])
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
itens = json.loads(relatorio.read_text(encoding="utf-8"))
numeros = {"оди́н": "1", "два́": "2", "три́": "3", "четы́ре": "4", "пя́ть": "5", "ше́сть": "6", "во́семь": "8", "де́вять": "9", "де́сять": "10"}

def normalizar(s):
    s = unicodedata.normalize("NFD", s.lower().replace("ё", "е"))
    return re.sub(r"[^а-яa-z0-9]", "", s)

with tempfile.TemporaryDirectory(dir=audios) as pasta:
    wav = pathlib.Path(pasta) / 'voz.wav'
    mp3 = pathlib.Path(pasta) / 'nova.mp3'
    for item in itens:
        if item['igual'] or item.get('ouvido', '').strip(' .!?') == numeros.get(item['txt']):
            continue
        for tentativa, configuracao in enumerate(({'noise_level': 0.4, 'speech_rate': 0.9}, {'noise_level': 0.25, 'speech_rate': 1.0}), 1):
            modelo.synth(item['sintese'], str(wav), speaker_id=2, **configuracao)
            subprocess.run([ffmpeg, '-y', '-loglevel', 'error', '-i', str(wav), '-af', 'adelay=150|150,apad=pad_dur=0.25', '-ac', '1', '-ar', '44100', '-b:a', '64k', str(mp3)], check=True)
            dados = subprocess.run([ffmpeg, '-loglevel', 'error', '-i', str(mp3), '-ar', '16000', '-ac', '1', '-f', 's16le', '-'], check=True, capture_output=True).stdout
            audio = np.frombuffer(dados, dtype=np.int16).astype(np.float32) / 32768.0
            segmentos, _ = whisper.transcribe(audio, language='ru', beam_size=5, vad_filter=False)
            ouvido = ' '.join(s.text.strip() for s in segmentos).strip()
            if normalizar(ouvido) == normalizar(item['txt']):
                (audios / item['arquivo']).write_bytes(mp3.read_bytes())
                item['ouvido'] = ouvido
                item['igual'] = True
                item['refeito'] = tentativa
                break
        print(f"{item['txt']}: {item['ouvido']} ({'ok' if item['igual'] else 'revisar'})", flush=True)
        relatorio.write_text(json.dumps(itens, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
