import { registry, notFound } from "./mf-registry.js";

export class Router {
  constructor({ outlet, onBeforeLoad, onAfterLoad, onError }) {
    this.outlet = outlet;
    this.currentModule = null;
    this.currentMf = null;
    this.onBeforeLoad = onBeforeLoad || (() => {});
    this.onAfterLoad = onAfterLoad || (() => {});
    this.onError = onError || ((e) => console.error(e));

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-link]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href && href.startsWith("/")) {
        e.preventDefault();
        this.navigate(href);
      }
    });

    window.addEventListener("popstate", () => this.resolve(location.pathname));
  }

  async navigate(path) {
    history.pushState({}, "", path);
    await this.resolve(path);
  }

  async resolve(path) {
    const route = registry[path] || null;
    const target = route ? route : notFound;

    try {
      this.onBeforeLoad(path);
      await this.unmountCurrent();

      const mod = await import(target.url);

      this.currentModule = mod;
      this.currentMf = {
        render: mod.render,
        unmount: mod.unmount || (() => {}),
      };

      await this.currentMf.render(this.outlet, { path });

      this.onAfterLoad(path);
    } catch (err) {
      this.onError(err);
      this.outlet.innerHTML = `<p class="error">Failed to load route: ${path}</p>`;
    }
  }

  async unmountCurrent() {
    if (this.currentMf) {
      try {
        await this.currentMf.unmount(this.outlet);
      } catch (e) {
        console.warn("Unmount error:", e);
      }
      this.currentMf = null;
      this.currentModule = null;
      this.outlet.innerHTML = "";
    }
  }
}
