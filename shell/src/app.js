import { Router } from "./router.js";

const outlet = document.getElementById("app");

const router = new Router({
  outlet,
  onBeforeLoad: (path) => {
    outlet.classList.add("loading");
  },
  onAfterLoad: () => {
    outlet.classList.remove("loading");
  },
  onError: (err) => {
    console.error("Router error:", err);
  }
});

router.resolve(location.pathname);
