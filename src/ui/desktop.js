import { openWindow } from '../core/windowManager.js';
import { icons } from './icons.js';

export const DESKTOP_APPS = [
  { appId: 'about', label: 'Sobre mim' },
  { appId: 'projects', label: 'Projetos' },
  { appId: 'resume', label: 'Currículo' },
  { appId: 'contact', label: 'Contato' },
];

export function initDesktopIcons(container) {
  const wrap = document.createElement('div');
  wrap.className = 'desktop-icons';

  DESKTOP_APPS.forEach(({ appId, label }) => {
    const icon = document.createElement('div');
    icon.className = 'desktop-icon';
    icon.innerHTML = `
      <div class="desktop-icon__glyph">${icons[appId]}</div>
      <div class="desktop-icon__label">${label}</div>
    `;
    icon.addEventListener('dblclick', () => openWindow(appId));
    wrap.appendChild(icon);
  });

  container.appendChild(wrap);
}
