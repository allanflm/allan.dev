import { bus } from '../core/eventBus.js';
import { getWindows, getFocusedId, toggleMinimize } from '../core/windowManager.js';
import { initStartMenu } from './startMenu.js';

export function initTaskbar(container) {
  container.innerHTML = `
    <div class="taskbar-start" id="taskbar-start"></div>
    <div class="taskbar-divider"></div>
    <div class="taskbar-programs" id="taskbar-programs"></div>
    <div class="taskbar-tray">
      <span class="taskbar-tray__icon" title="Rede">${trayNetworkIcon}</span>
      <span class="taskbar-tray__icon" title="Volume">${trayVolumeIcon}</span>
    </div>
    <div class="taskbar-clock" id="taskbar-clock"></div>
  `;

  initStartMenu(container.querySelector('#taskbar-start'));

  render();
  bus.on('windows:changed', render);

  tickClock();
  setInterval(tickClock, 1000);

  function render() {
    const programsEl = container.querySelector('#taskbar-programs');
    const focusedId = getFocusedId();

    programsEl.innerHTML = '';
    getWindows().forEach((win) => {
      const btn = document.createElement('button');
      btn.className = 'taskbar-program';
      btn.classList.toggle('is-active', win.id === focusedId);
      btn.setAttribute('aria-label', win.title);
      btn.title = win.title;
      btn.textContent = win.title;
      btn.addEventListener('click', () => toggleMinimize(win.id));
      programsEl.appendChild(btn);
    });
  }

  function tickClock() {
    const clockEl = container.querySelector('#taskbar-clock');
    if (clockEl) {
      clockEl.textContent = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }
}

const trayNetworkIcon = `
  <svg viewBox="0 0 16 16" width="14" height="14">
    <path d="M1 5.5a10 10 0 0 1 14 0" stroke="#fff" stroke-width="1.3" fill="none" opacity="0.6"/>
    <path d="M3.5 8a6.5 6.5 0 0 1 9 0" stroke="#fff" stroke-width="1.3" fill="none" opacity="0.8"/>
    <path d="M6 10.5a3 3 0 0 1 4 0" stroke="#fff" stroke-width="1.3" fill="none"/>
    <circle cx="8" cy="13" r="1" fill="#fff"/>
  </svg>
`;

const trayVolumeIcon = `
  <svg viewBox="0 0 16 16" width="14" height="14">
    <path d="M2 6h2.5L8 3v10L4.5 10H2z" fill="#fff"/>
    <path d="M10.5 5.5a4 4 0 0 1 0 5" stroke="#fff" stroke-width="1.3" fill="none"/>
  </svg>
`;
