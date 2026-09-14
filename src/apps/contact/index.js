export default {
  id: 'contact',
  title: 'Contato',
  defaultSize: { width: 380, height: 260 },
  singleton: true,
  mount(container) {
    container.innerHTML = `
      <p>Me encontra por aqui:</p>
      <ul class="contact-list">
        <li><a href="https://www.linkedin.com/in/allanflm" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="https://github.com/allanflm" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://www.instagram.com/allanflm/" target="_blank" rel="noopener">Instagram</a></li>
      </ul>
    `;
  },
};
