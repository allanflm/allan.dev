import { bus } from '../core/eventBus.js';
import { getWindows, getFocusedId, toggleMinimize } from '../core/windowManager.js';

export function initTaskbar(container) {
  container.innerHTML = `
    <div class="taskbar-start"></div>
    <div class="taskbar-divider"></div>
    <div class="taskbar-programs" id="taskbar-programs"></div>
    <div class="taskbar-clock" id="taskbar-clock"></div>
  `;

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
