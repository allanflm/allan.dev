export default {
  id: 'projects',
  title: 'Projetos',
  defaultSize: { width: 480, height: 300 },
  singleton: true,
  mount(container) {
    container.innerHTML = `
      <p>Ainda organizando os projetos para colocar aqui.</p>
      <p>Enquanto isso, dá uma olhada no
      <a href="https://github.com/allanflm" target="_blank" rel="noopener">GitHub</a>.</p>
    `;
  },
};
