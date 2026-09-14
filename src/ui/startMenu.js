import { openWindow } from '../core/windowManager.js';
import { icons } from './icons.js';
import { DESKTOP_APPS } from './desktop.js';

export function initStartMenu(startButtonEl) {
  const menu = document.createElement('div');
  menu.className = 'start-menu';
  menu.hidden = true;
  menu.innerHTML = DESKTOP_APPS.map(
    ({ appId, label }) => `
      <button class="start-menu__item" data-app="${appId}">
        <span class="start-menu__icon">${icons[appId]}</span>
        <span>${label}</span>
      </button>
    `
  ).join('');
  document.body.appendChild(menu);

  menu.querySelectorAll('[data-app]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openWindow(btn.dataset.app);
      closeMenu();
    });
  });

  function openMenu() {
    menu.hidden = false;
  }

  function closeMenu() {
    menu.hidden = true;
  }

  startButtonEl.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.hidden ? openMenu() : closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && event.target !== startButtonEl) {
      closeMenu();
    }
  });
}
