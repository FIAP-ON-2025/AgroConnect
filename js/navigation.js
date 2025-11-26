
const allNavLinks = {
  'Início': 'pages/home.html',
  'Cadastre-se': 'pages/cadastro.html',
  'Fale Conosco': 'pages/fale-conosco.html',
  'Features': 'pages/features.html'
};

function createNav(config) {
  const navElement = document.querySelector('nav');
  if (!navElement) {
    console.error('A tag <nav> não foi encontrada nesta página.');
    return;
  }


  const linksHtml = config.items.map(itemName => {
      const href = allNavLinks[itemName];
      if (!href) {
        console.warn(`Item de navegação "${itemName}" não encontrado na lista unificada.`);
        return '';
      }

      const finalHref = config.basePath + href;
      return `<li><a href="${finalHref}">${itemName}</a></li>`;
    }).join('');


  const navContent = `
    <div class="logo">
        <img src="${config.logoSrc}" alt="AgroConnect Logo" class="logo-img">
    </div>
    <ul class="nav-links">
        ${linksHtml}
    </ul>
  `;

  navElement.innerHTML = navContent;
}
