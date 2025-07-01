// Background service worker for Secret Clicker extension 

// Заглушка для Howler.js и звуков
// В реальной реализации сюда добавим загрузку и проигрывание звуков

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'test-sound') {
    playRandomSound();
  } else if (msg.action === 'play') {
    playSoundByTrigger(msg.trigger);
  } else if (msg.action === 'bonus') {
    playBonusMelody();
  }
});

self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || !data.secretClicker) return;
  if (data.action === 'play') {
    playSoundByTrigger(data.trigger);
  } else if (data.action === 'bonus') {
    playBonusMelody();
  }
});

function playRandomSound() {
  // TODO: Реализовать проигрывание случайного звука
  console.log('Play random sound!');
}

function playSoundByTrigger(trigger) {
  // TODO: Реализовать проигрывание звука по триггеру
  console.log('Play sound for trigger:', trigger);
}

function playBonusMelody() {
  // TODO: Реализовать проигрывание бонус-мелодии
  console.log('Play bonus melody!');
}

// Воспроизведение звука при переключении вкладок
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.sendMessage(activeInfo.tabId, { action: 'tab-activated' });
}); 