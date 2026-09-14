import { openWindow } from '../core/windowManager.js';

// Só "Sobre mim" tem app de verdade por trás nesse esqueleto.
// Os outros três ficam como preview visual até os apps existirem.
const ICONS = [
  { appId: 'about', glyph: '🗂️', label: 'Sobre mim', enabled: true },
  { appId: 'projects', glyph: '📁', label: 'Projetos', enabled: false },
  { appId: 'resume', glyph: '📄', label: 'Currículo', enabled: false },
  { appId: 'contact', glyph: '✉️', label: 'Contato', enabled: false },
];

export function initDesktopIcons(container) {
  const wrap = document.createElement('div');
  wrap.className = 'desktop-icons';

  ICONS.forEach(({ appId, glyph, label, enabled }) => {
    const icon = document.createElement('div');
    icon.className = 'desktop-icon';
    icon.innerHTML = `
      <div class="desktop-icon__glyph">${glyph}</div>
      <div class="desktop-icon__label">${label}</div>
    `;
    if (enabled) {
      icon.addEventListener('dblclick', () => openWindow(appId));
    } else {
      icon.classList.add('is-disabled');
    }
    wrap.appendChild(icon);
  });

  container.appendChild(wrap);
}
