import {
  renderTitle,
  pageTitleComponent,
  textSectionComponent,
  linkSectionComponent,
  errorCardComponent,
} from './components.js';


export async function render(container, { env }) {
  const home_host = env.MFE_HOST_HOME || 'http://localhost:4001';
  const api_host = env.API_HOST_HOME || 'http://localhost:3000';

  const cssRef = `${home_host}/home.css`;

  if (![...document.styleSheets].some(sheet => sheet.href === cssRef)) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = cssRef;
    document.head.appendChild(style);
  }

  const section = document.createElement('section');
  section.className = 'mfe-home-section';

  const endpoints = [
    {
      key: 'sobre',
      url: `${api_host}/api/v1/sobre`,
      callback: pageTitleComponent(section),
    },
    {
      key: 'intro',
      url: `${api_host}/api/v1/sobre/intro`,
      callback: textSectionComponent(section),
    },
    {
      key: 'objetivo',
      url: `${api_host}/api/v1/sobre/objetivo`,
      callback: textSectionComponent(section, { title: 'Objetivo' }),
    },
    {
      key: 'contatos',
      url: `${api_host}/api/v1/contatos`,
      callback: linkSectionComponent(section, { title: 'Contatos do autor' }),
    },
    {
      key: 'status-card',
      url: `${api_host}/api/v1/linha-do-tempo`,
      callback: async (data) => {
        const current = data.find(item => item.em_andamento === true || item.em_andamento);
        if (current) {
          try {
            renderTitle(section, { title: 'Etapa atual' });
            const marcos_host = env.MFE_HOST_MARCOS || 'http://localhost:4002';
            const marcos = await import(`${marcos_host}/marcos.js`);
            marcos.renderCard(section, { env, item: current, compact: true });
          } catch (err) {
            console.error('Could not import marcos.renderCard', err);
            errorCardComponent(section, { title: 'Erro ao buscar o estado do projeto.' })();
          }
        }
      },
    },
  ];

  try {
    const responses = await Promise.all(endpoints.map(e => fetch(e.url).then(r => r.json())));
    responses.forEach(async (data, i) => {
      const cb = endpoints[i].callback;
      try {
        cb(data);
      } catch (err) {
        console.warn(`Failed to process response for ${endpoints[i].key}:`, err);
      }
    });
  } catch (err) {
    console.warn('One or more requests failed:', err);
  }

  container.appendChild(section);
}

export async function unmount(container) {}
