function formatDate(dateString) {
  const [year, month] = dateString.split("-");
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${monthNames[parseInt(month) - 1]} de ${year}`;
}


export function createCardComponent(container, { item, compact=false }) {
  const content = document.createElement('div');
  content.className = 'timeline-card-content';

  const title = document.createElement('p');
  title.className = "timeline-card-title";
  title.textContent = item.entrega;

  const date = document.createElement('p');
  date.className = 'timeline-card-date';
  date.textContent = formatDate(item.data);

  const status = document.createElement('span');
  status.className = 'timeline-card-status';
  status.textContent = item.em_andamento ? '🔄️ Em Andamento' : item.concluido ? '✅ Concluído' : '🔘 Pendente';

  content.appendChild(title);
  content.appendChild(date);
  content.appendChild(status);

  const statusClassAnnotation = item.concluido ? 'completed' : item.em_andamento ? 'in-progress' : '';

  let wrapper;

  if (compact) {
    wrapper = content;
    wrapper.className = `timeline-card-item-compact ${statusClassAnnotation}`;
  } else {
    const marker = document.createElement('div');
    marker.className = 'timeline-marker';

    wrapper = document.createElement('div');
    wrapper.className = `timeline-card-item ${statusClassAnnotation}`;
    
    wrapper.appendChild(marker);
    wrapper.appendChild(content);
  }

  container.appendChild(wrapper);
}
