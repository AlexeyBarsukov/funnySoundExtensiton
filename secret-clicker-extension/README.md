# Тайный Кликер (Secret Clicker)

Браузерное расширение для весёлых звуков при кликах.

## Структура

- manifest.json — манифест расширения
- popup/ — настройки (popup.html, popup.js, popup.css)
- scripts/
  - content.js — внедряется на страницы
  - background.js — service worker
- sounds/
  - random/ — случайные звуки
  - triggers/ — звуки по событиям
- icons/ — иконки расширения (icon16.png, icon32.png, icon48.png, icon128.png)

## Установка
1. Откройте chrome://extensions (или about:debugging в Firefox)
2. Включите режим разработчика
3. Загрузите папку secret-clicker-extension как распакованное расширение

## TODO
- Добавить звуковые файлы в папку sounds/
- Доработать проигрывание звуков через Howler.js
- Добавить иконки в папку icons/ (16x16, 32x32, 48x48, 128x128) 