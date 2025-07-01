from PIL import Image, ImageDraw, ImageFont
import os

# Папка для иконок
ICON_DIR = 'secret-clicker-extension/icons'
os.makedirs(ICON_DIR, exist_ok=True)

# Размеры иконок
sizes = [16, 32, 48, 128]

# Цвета
bg_color = (70, 130, 180)  # steelblue
text_color = (255, 255, 255)

for size in sizes:
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    # Пробуем подобрать шрифт
    try:
        font = ImageFont.truetype('arial.ttf', size=int(size*0.7))
    except:
        font = ImageFont.load_default()
    text = 'S'
    bbox = font.getbbox(text)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    draw.text((x, y), text, font=font, fill=text_color)
    img.save(os.path.join(ICON_DIR, f'icon{size}.png'))
print('Иконки сгенерированы!') 