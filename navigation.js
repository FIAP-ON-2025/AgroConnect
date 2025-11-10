
// Fonte unificada para todos os links de navegação.
// Os caminhos são relativos à raiz do projeto.
const allNavLinks = {
  'Início': 'index.html',
  'Cadastre-se': 'cadastro/index.html',
  'Fale Conosco': 'fale-conosco/index.html',
  'Features': 'features/index.html'
  // Adicione novos links aqui no futuro.
};

/**
 * Cria a barra de navegação para uma página.
 * @param {object} config - Objeto de configuração.
 * @param {string} config.logoSrc - O caminho para a imagem do logo, relativo à página atual.
 * @param {string} config.basePath - O caminho relativo da página atual para a raiz do projeto (ex: './' ou '../').
 * @param {string[]} config.items - Uma lista de nomes dos itens de menu a serem exibidos (ex: ['Início', 'Fale Conosco']).
 */
function createNav(config) {
  const navElement = document.querySelector('nav');
  if (!navElement) {
    console.error('A tag <nav> não foi encontrada nesta página.');
    return;
  }

  // Constrói os links HTML com base nos itens fornecidos.
  const linksHtml = config.items.map(itemName => {
      const href = allNavLinks[itemName];
      if (!href) {
        console.warn(`Item de navegação "${itemName}" não encontrado na lista unificada.`);
        return '';
      }
      // Monta o caminho final do link usando o basePath da página.
      const finalHref = config.basePath + href;
      return `<li><a href="${finalHref}">${itemName}</a></li>`;
    }).join('');

  // Gera o HTML final da navegação.
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
