// content.js — основной скрипт для Secret Clicker

// Счётчик быстрых кликов
let clickTimes = [];

function playSoundByType(type) {
  try {
    const soundMap = {
      link: 'sounds/random/click.wav',
      button: 'sounds/random/click.wav',
      buy: 'sounds/random/click.wav',
      submit: 'sounds/random/click.wav',
      other: 'sounds/random/click.wav',
    };
    if (!chrome.runtime || !chrome.runtime.getURL) return;
    const url = chrome.runtime.getURL(soundMap[type] || soundMap.other);
    const audio = new Audio(url);
    audio.play().catch(e => console.error('Ошибка воспроизведения:', e));
  } catch (e) {
    console.error('Ошибка контекста расширения:', e);
  }
}

function playBonusMelody() {
  try {
    if (!chrome.runtime || !chrome.runtime.getURL) return;
    const url = chrome.runtime.getURL('sounds/random/bonus.wav');
    const audio = new Audio(url);
    audio.play().catch(e => console.error('Ошибка бонуса:', e));
  } catch (e) {
    console.error('Ошибка бонус-контекста расширения:', e);
  }
}

try {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'play' && msg.trigger) {
      playSoundByType(msg.trigger);
    } else if (msg.action === 'bonus') {
      playBonusMelody();
    } else if (msg.action === 'tab-activated') {
      try {
        if (!chrome.runtime || !chrome.runtime.getURL) return;
        const url = chrome.runtime.getURL('sounds/random/oy.wav');
        const audio = new Audio(url);
        audio.play().catch(e => console.error('Ошибка ОЙ:', e));
      } catch (e) {
        console.error('Ошибка контекста ОЙ:', e);
      }
    }
  });
} catch (e) {
  console.error('Ошибка добавления слушателя сообщений:', e);
}

function handleClick(e) {
  // Определяем тип элемента
  let el = e.target;
  let type = 'other';
  if (el.closest('a')) type = 'link';
  else if (el.closest('input[type="submit"]')) type = 'submit';
  else if (el.closest('button')) {
    if (/купить/i.test(el.textContent)) type = 'buy';
    else type = 'button';
  }

  // Счётчик быстрых кликов
  const now = Date.now();
  clickTimes = clickTimes.filter(t => now - t < 3000);
  clickTimes.push(now);
  if (clickTimes.length >= 10) {
    clickTimes = [];
    chrome.runtime.sendMessage({ action: 'bonus' });
  }

  // Сообщение для фонового скрипта
  try {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ action: 'play', trigger: type });
    }
  } catch (e) {
    console.error('Ошибка отправки сообщения:', e);
  }
  // Воспроизводим звук сразу на странице
  playSoundByType(type);
}

document.addEventListener('click', handleClick, true); 