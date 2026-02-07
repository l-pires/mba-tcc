import { createCardComponent } from "./components.js";


export async function render(container, { env }) {
  const marcos_host = env.MFE_HOST_MARCOS || "http://localhost:4002";
  const api_host = env.API_HOST_MARCOS || "http://localhost:3000";

  const cssRef = `${marcos_host}/marcos.css`;

  if (![...document.styleSheets].some(sheet => sheet.href === cssRef)) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = cssRef;
    document.head.appendChild(style);
  }

  try {
    const response = await fetch(`${api_host}/api/v1/linha-do-tempo`);
    const timelineData = await response.json();

    const containerWrap = document.createElement('div');
    containerWrap.className = 'timeline-container';

    const containerTitle = document.createElement('h2');
    containerTitle.className = 'timeline-title';
    containerTitle.textContent = 'Cronograma do Projeto';
    containerWrap.appendChild(containerTitle);

    const timelineDiv = document.createElement('div');
    timelineDiv.className = 'timeline';

    timelineData.forEach(item => {
    createCardComponent(timelineDiv, { item, compact: false });
    });

    containerWrap.appendChild(timelineDiv);
    
    container.appendChild(containerWrap);
  } catch (error) {
    console.error("Error loading timeline:", error);
    const errMsg = document.createElement('p');
    errMsg.className = 'error';
    errMsg.textContent = 'Erro ao carregar cronograma';
    container.appendChild(errMsg);
  }
}

export function renderCard(container, { env, item, compact=false}) {
  if (env) {
    const marcos_host = env.MFE_HOST_MARCOS || "http://localhost:4002";
    const cssRef = `${marcos_host}/marcos.css`;
    if (![...document.styleSheets].some(sheet => sheet.href === cssRef)) {
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = cssRef;
      document.head.appendChild(style);
    }
  }

  createCardComponent(container, { item, compact });
}

export async function unmount() {}
