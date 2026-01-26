export async function render(container) {
  container.innerHTML = `
    <section>
      <h1>About</h1>
      <p>Served from about.example.com. No iframe—just ES module dynamic import.</p>
      <ul id="facts"></ul>
    </section>
  `;

  // Simulate fetching local data from the same origin
  const facts = [
    "Each microfrontend is independently deployable.",
    "The container controls routing and lifecycle.",
    "Shared utilities can be loaded from a CDN."
  ];

  const list = container.querySelector("#facts");
  facts.forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    list.appendChild(li);
  });
}

export async function unmount() {}
