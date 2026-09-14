import { attachDrag } from './dragController.js';
import { closeWindow, toggleMinimize, toggleMaximize, focusWindow, moveWindow } from './windowManager.js';

export function createWindowElement(win) {
  const el = document.createElement('div');
  el.className = 'window';
  el.dataset.windowId = win.id;
  el.style.position = 'absolute';
  el.style.top = '0';
  el.style.left = '0';
  el.style.width = `${win.width}px`;
  el.style.height = `${win.height}px`;
  el.style.transform = `translate(${win.x}px, ${win.y}px)`;

  el.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-text"></div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" data-action="minimize"></button>
        <button aria-label="Maximize" data-action="maximize"></button>
        <button aria-label="Close" data-action="close"></button>
      </div>
    </div>
    <div class="window-body"></div>
  `;

  el.querySelector('.title-bar-text').textContent = win.title;
  const titleBar = el.querySelector('.title-bar');
  const contentEl = el.querySelector('.window-body');

  el.addEventListener('pointerdown', () => focusWindow(win.id));

  el.querySelector('[data-action="close"]').addEventListener('click', (event) => {
    event.stopPropagation();
    closeWindow(win.id);
  });
  el.querySelector('[data-action="minimize"]').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMinimize(win.id);
  });
  el.querySelector('[data-action="maximize"]').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMaximize(win.id);
  });

  attachDrag(titleBar, {
    getPosition: () => ({ x: win.x, y: win.y }),
    onMove: (x, y) => moveWindow(win.id, x, y),
  });

  return { el, contentEl };
}
