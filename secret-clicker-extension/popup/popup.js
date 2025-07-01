// popup.js — управление настройками расширения

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-enabled');
  const mode = document.getElementById('mode-select');
  const volume = document.getElementById('volume-range');
  const testBtn = document.getElementById('test-sound');

  // Загрузка настроек
  chrome.storage.local.get(['enabled', 'mode', 'volume'], (data) => {
    toggle.checked = data.enabled !== false;
    mode.value = data.mode || 'random';
    volume.value = typeof data.volume === 'number' ? data.volume : 1;
  });

  // Сохранение настроек
  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });
  mode.addEventListener('change', () => {
    chrome.storage.local.set({ mode: mode.value });
  });
  volume.addEventListener('input', () => {
    chrome.storage.local.set({ volume: parseFloat(volume.value) });
  });

  // Тестовый клик
  testBtn.addEventListener('click', () => {
    const audio = new Audio(chrome.runtime.getURL('sounds/random/click.wav'));
    audio.play().catch(e => console.error('Ошибка воспроизведения:', e));
  });
}); 