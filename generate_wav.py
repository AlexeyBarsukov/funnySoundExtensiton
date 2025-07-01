import wave
import struct
import math
import os

# Параметры звука для обычного клика
sample_rate = 44100
freq = 880.0  # частота сигнала (Гц)
duration = 0.15  # длительность (сек)
volume = 0.5

n_samples = int(sample_rate * duration)

# Папка для файла
os.makedirs('secret-clicker-extension/sounds/random', exist_ok=True)
filename = 'secret-clicker-extension/sounds/random/click.wav'

with wave.open(filename, 'w') as wav_file:
    wav_file.setparams((1, 2, sample_rate, n_samples, 'NONE', 'not compressed'))
    for i in range(n_samples):
        value = int(volume * 32767.0 * math.sin(2 * math.pi * freq * i / sample_rate))
        data = struct.pack('<h', value)
        wav_file.writeframesraw(data)
print('WAV-файл сгенерирован:', filename)

# Генерация бонус-мелодии (длиннее и выше)
bonus_freq = 1760.0
bonus_duration = 0.5
bonus_samples = int(sample_rate * bonus_duration)
bonus_filename = 'secret-clicker-extension/sounds/random/bonus.wav'
with wave.open(bonus_filename, 'w') as wav_file:
    wav_file.setparams((1, 2, sample_rate, bonus_samples, 'NONE', 'not compressed'))
    for i in range(bonus_samples):
        value = int(volume * 32767.0 * math.sin(2 * math.pi * bonus_freq * i / sample_rate))
        data = struct.pack('<h', value)
        wav_file.writeframesraw(data)
print('WAV-файл сгенерирован:', bonus_filename)

# Генерация звука "ОЙ" (низкий короткий)
oy_freq = 440.0
oy_duration = 0.18
oy_samples = int(sample_rate * oy_duration)
oy_filename = 'secret-clicker-extension/sounds/random/oy.wav'
with wave.open(oy_filename, 'w') as wav_file:
    wav_file.setparams((1, 2, sample_rate, oy_samples, 'NONE', 'not compressed'))
    for i in range(oy_samples):
        value = int(volume * 32767.0 * math.sin(2 * math.pi * oy_freq * i / sample_rate))
        data = struct.pack('<h', value)
        wav_file.writeframesraw(data)
print('WAV-файл сгенерирован:', oy_filename) 