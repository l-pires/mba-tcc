import { Router } from "./router.js";

const outlet = document.getElementById("app");

const router = new Router({
  outlet,
  onBeforeLoad: (path) => {
    outlet.classList.add("loading");
    outlet.innerHTML = `<p>Loading ${path}…</p>`;
  },
  onAfterLoad: () => {
    outlet.classList.remove("loading");
  },
  onError: (err) => {
    console.error("Router error:", err);
  }
});

router.resolve(location.pathname);

import { registry } from "./mf-registry.js";
Object.values(registry).forEach(({ prefetch = [] }) => {
  prefetch.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  });
});
