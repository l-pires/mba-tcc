import {
  pageTitleComponent,
  textSectionComponent,
  linkSectionComponent,
} from './components.js';


export async function render(container, { env }) {
  const sobre_host = env?.MFE_HOST_SOBRE || 'http://localhost:4000';
  const api_host = env?.API_HOST_SOBRE || 'http://localhost:3000';

  const cssRef = `${sobre_host}/sobre.css`;

  if (![...document.styleSheets].some(sheet => sheet.href === cssRef)) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = cssRef;
    document.head.appendChild(style);
  }

  const section = document.createElement('section');
  section.className = 'mfe-sobre-section';

  const endpoints = [
    {
      key: 'sobre',
      url: `${api_host}/api/v1/sobre`,
      callback: pageTitleComponent(section),
    },
    {
      key: 'contexto',
      url: `${api_host}/api/v1/sobre/contexto`,
      callback: textSectionComponent(section, { title: 'Contexto' })
    },
    {
      key: 'estrutura',
      url: `${api_host}/api/v1/sobre/estrutura`,
      callback: textSectionComponent(section)
    },
    {
      key: 'repo',
      url: `${api_host}/api/v1/contatos/repo`,
      callback: linkSectionComponent(section, { title: 'Repositório do Projeto' }),
    },
  ];

  try {
    const responses = await Promise.all(endpoints.map(e => fetch(e.url).then(r => r.json())));
    responses.forEach((data, i) => {
      try {
        endpoints[i].callback(data);
      } catch (err) {
        console.warn(`Failed to process ${endpoints[i].key}:`, err);
      }
    });
  } catch (err) {
    console.warn('One or more requests failed:', err);
  }

  container.appendChild(section);
}

export async function unmount() {}
