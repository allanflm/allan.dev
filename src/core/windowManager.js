import { getApp } from './appRegistry.js';
import { createWindowElement } from './windowView.js';
import { bus } from './eventBus.js';

// Precisa bater com --taskbar-height em src/styles/tokens.css.
const TASKBAR_HEIGHT = 40;
// Quantos pixels da title bar precisam ficar sempre visíveis,
// pra nunca perder uma janela arrastada pra fora da tela. Tem que
// ser maior que a largura do bloco de botões (minimizar/maximizar/
// fechar) do 7.css (~108px), senão dá pra arrastar o botão de
// minimizar pra fora da tela e ele fica inclicável.
const MIN_VISIBLE = 140;

let desktopEl = null;
let nextInstanceCount = 0;

const state = {
  windows: [],
  focusedId: null,
};

export function initWindowManager(container) {
  desktopEl = container;
}

export function getWindows() {
  return state.windows;
}

export function getFocusedId() {
  return state.focusedId;
}

export function openWindow(appId) {
  const app = getApp(appId);
  if (!app) {
    console.warn(`App "${appId}" não está registrado.`);
    return;
  }

  if (app.singleton) {
    const existing = state.windows.find((w) => w.appId === appId);
    if (existing) {
      restoreWindow(existing.id);
      return;
    }
  }

  nextInstanceCount += 1;
  const id = `${appId}-${nextInstanceCount}`;
  const { width, height } = app.defaultSize;
  const offset = state.windows.length * 24;

  const win = {
    id,
    appId,
    title: app.title,
    x: 80 + offset,
    y: 60 + offset,
    width,
    height,
    zIndex: 100,
    isMinimized: false,
    isMaximized: false,
    prevBounds: null,
    el: null,
    contentEl: null,
    unmount: null,
  };

  const { el, contentEl } = createWindowElement(win);
  win.el = el;
  win.contentEl = contentEl;
  desktopEl.appendChild(el);

  win.unmount = app.mount(contentEl) || null;

  state.windows.push(win);
  focusWindow(id);
}

export function closeWindow(id) {
  const index = state.windows.findIndex((w) => w.id === id);
  if (index === -1) return;

  const [win] = state.windows.splice(index, 1);
  win.unmount?.();
  win.el.remove();

  if (state.focusedId === id) {
    const next = [...state.windows]
      .filter((w) => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0];
    state.focusedId = next ? next.id : null;
  }

  bus.emit('windows:changed');
}

export function minimizeWindow(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win || win.isMinimized) return;

  win.isMinimized = true;
  win.el.classList.add('is-minimized');
  win.el.classList.remove('active');

  if (state.focusedId === id) {
    const next = [...state.windows]
      .filter((w) => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0];
    state.focusedId = next ? next.id : null;
  }

  bus.emit('windows:changed');
}

export function restoreWindow(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;

  win.isMinimized = false;
  win.el.classList.remove('is-minimized');
  focusWindow(id);
}

// Usado pela taskbar: clicar num botão focado minimiza,
// clicar num botão minimizado ou de outra janela restaura/foca.
export function toggleMinimize(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;

  if (win.isMinimized) {
    restoreWindow(id);
  } else if (state.focusedId === id) {
    minimizeWindow(id);
  } else {
    focusWindow(id);
  }
}

export function focusWindow(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win || win.isMinimized) return;

  state.focusedId = id;

  // Reordena por z-index atual e reatribui 100..100+n. Nunca cresce
  // sem limite, mesmo depois de milhares de cliques.
  const ordered = [...state.windows].sort((a, b) => a.zIndex - b.zIndex);
  const from = ordered.findIndex((w) => w.id === id);
  ordered.push(ordered.splice(from, 1)[0]);

  ordered.forEach((w, i) => {
    w.zIndex = 100 + i;
    w.el.style.zIndex = String(w.zIndex);
    w.el.classList.toggle('active', w.id === id);
  });

  bus.emit('windows:changed');
}

export function moveWindow(id, x, y) {
  const win = state.windows.find((w) => w.id === id);
  if (!win || win.isMaximized) return;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight - TASKBAR_HEIGHT;

  win.x = Math.min(Math.max(x, -(win.width - MIN_VISIBLE)), viewportWidth - MIN_VISIBLE);
  win.y = Math.min(Math.max(y, 0), viewportHeight - 28);

  win.el.style.transform = `translate(${win.x}px, ${win.y}px)`;
}

export function toggleMaximize(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;

  if (win.isMaximized) {
    win.isMaximized = false;
    Object.assign(win, win.prevBounds);
    win.prevBounds = null;
  } else {
    win.prevBounds = { x: win.x, y: win.y, width: win.width, height: win.height };
    win.isMaximized = true;
    win.x = 0;
    win.y = 0;
    win.width = window.innerWidth;
    win.height = window.innerHeight - TASKBAR_HEIGHT;
  }

  win.el.style.width = `${win.width}px`;
  win.el.style.height = `${win.height}px`;
  win.el.style.transform = `translate(${win.x}px, ${win.y}px)`;
  focusWindow(id);
}
