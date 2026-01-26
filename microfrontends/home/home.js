const host = "http://localhost:4001";

export async function render(container) {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = `${host}/home.css`;
  document.head.appendChild(style);

  container.innerHTML = `
    <section>
      <h1>Home</h1>
      <p>This is the Home microfrontend, served from ${host}.</p>
      <button id="home-btn">Click me</button>
    </section>
  `;

  const btn = container.querySelector("#home-btn");
  btn.addEventListener("click", onClick);
  container._homeButtonCleanup = () => btn.removeEventListener("click", onClick);

  function onClick() {
    alert("Home MFE button clicked!");
  }
}

export async function unmount(container) {
  if (container._homeButtonCleanup) {
    container._homeButtonCleanup();
    delete container._homeButtonCleanup;
  }
}
