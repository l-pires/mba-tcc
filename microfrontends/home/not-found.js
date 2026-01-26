export async function render(container, { path }) {
  container.innerHTML = `
    <section>
      <p>Not found: <code>${path}</code>.</p>
    </section>
  `;
}

export async function unmount() {}
