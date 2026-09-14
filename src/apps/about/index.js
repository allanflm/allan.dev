export default {
  id: 'about',
  title: 'Sobre mim',
  defaultSize: { width: 480, height: 320 },
  singleton: true,
  mount(container) {
    container.innerHTML = `
      <p>Engenheiro de Dados Júnior na <span class="highlight-orange">Hvar Consulting</span>.</p>
      <p>Sou otimista e busco viver a vida aproveitando a jornada.</p>
      <p>Nascido em Mafra, Santa Catarina. Apaixonado por filmes, séries, tecnologia e café.</p>
    `;
  },
};
