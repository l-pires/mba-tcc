export const registry = {
  "/": {
    url: "http://localhost:4001/home.js",
    prefetch: ["http://localhost:4001/home.css"]
  },
  "/about": {
    url: "http://localhost:4000/about.js",
    prefetch: []
  }
};

export const notFound = {
  url: "http://localhost:4001/not-found.js"
};
