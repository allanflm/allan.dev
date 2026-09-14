export default {
  id: 'resume',
  title: 'Currículo',
  defaultSize: { width: 440, height: 300 },
  singleton: true,
  mount(container) {
    container.innerHTML = `
      <p><strong>Allan Felipe</strong></p>
      <p>Engenheiro de Dados Júnior — <span class="highlight-orange">Hvar Consulting</span></p>
      <p>Mafra, Santa Catarina, Brasil</p>
      <p>Experiência, formação e habilidades completas em breve por aqui.
      Enquanto isso, fala comigo pelo <a href="https://www.linkedin.com/in/allanflm" target="_blank" rel="noopener">LinkedIn</a>.</p>
    `;
  },
};
