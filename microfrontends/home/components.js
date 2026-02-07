export function renderTitle(container, { title, tag='h4' } = {}) {
    const titleElement = document.createElement(tag);
    titleElement.className = `mfe-home-title-${tag}`;
    titleElement.textContent = title;
    container.appendChild(titleElement);
}

function renderParagraph(container, { text } = {}) {
  const paragraph = document.createElement('p');
  paragraph.className = 'mfe-home-paragraph';
  paragraph.textContent = text;
  container.appendChild(paragraph);
}

function renderAnchor(container, { href, text } = {}) {
  if (!text) text = href;
  const anchor = document.createElement('a');
  anchor.className = 'mfe-home-anchor-link';
  anchor.href = href;
  anchor.textContent = text;
  anchor.target = '_blank';
  container.appendChild(anchor);
}

export function pageTitleComponent(container) {
  return function ({ titulo, curso }) {
    renderTitle(container, { title: titulo, tag: 'h2' });
    renderTitle(container, { title: curso, tag: 'h3' });
  }
}

export function textSectionComponent(container, { title } = {}) {
  return function ({ conteudo }) {
    if (title) renderTitle(container, { title });
    conteudo.forEach(item => {
      if (typeof item === 'object') {
        if (item.titulo) renderTitle(container, { title: item.titulo });
        item.texto.forEach(text => renderParagraph(container, { text }));
      } else if (typeof item === 'string') {
        renderParagraph(container, { text: item });
      }
    });
  }
}

export function linkSectionComponent(container, { title } = {}) {
  return function (data) {
    if (title) renderTitle(container, { title });
    if (!Array.isArray(data)) {
      data = [data];
    }
    data.forEach(item => {
      renderAnchor(container, { href: item.url });
    });
  }
}

export function errorCardComponent(container, {
  title, text='Falha ao conectar com o componente remoto.'
} = {}) {
  return function () {
    const card = document.createElement('div');
    card.className = 'mfe-home-error-card';
    renderTitle(card, { title });
    renderParagraph(card, { text });
    container.appendChild(card);
  }
}
