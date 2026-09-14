import '7.css/dist/7.css';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/desktop.css';
import './styles/window.css';
import './styles/taskbar.css';

import { initWindowManager, openWindow } from './core/windowManager.js';
import { registerApp } from './core/appRegistry.js';
import { initDesktopIcons } from './ui/desktop.js';
import { initTaskbar } from './ui/taskbar.js';
import aboutApp from './apps/about/index.js';

const desktopEl = document.querySelector('#desktop');
const taskbarEl = document.querySelector('#taskbar');

initWindowManager(desktopEl);
registerApp(aboutApp);
initDesktopIcons(desktopEl);
initTaskbar(taskbarEl);

openWindow('about');
