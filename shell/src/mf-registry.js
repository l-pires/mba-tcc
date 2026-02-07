import env from './env.js';

export const registry = {
  "/": {
    url: env.MFE_HOST_HOME + "/home.js",
  },
  "/marcos": {
    url: env.MFE_HOST_MARCOS + "/marcos.js",
  },
  "/sobre": {
    url: env.MFE_HOST_SOBRE + "/sobre.js",
  },
};

export const notFound = {
  url: env.MFE_HOST_HOME + "/not-found.js",
};
