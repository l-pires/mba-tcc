import express from 'express';

import { cacheMiddlewareBefore, createCachingProxy } from './proxy.js'


const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api-gateway running...',
    version: process.env.npm_package_version,
  });
});

router.use(
  '/api/v1/sobre',
  cacheMiddlewareBefore,
  createCachingProxy(process.env.API_HOST_SOBRE + '/api/v1/sobre', parseInt(process.env.CACHE_TTL, 10) || 300)
);

router.use(
  '/api/v1/linha-do-tempo',
  cacheMiddlewareBefore,
  createCachingProxy(process.env.API_HOST_MARCOS + '/api/v1/linha-do-tempo', parseInt(process.env.CACHE_TTL, 10) || 300)
);

router.use(
  '/api/v1/contatos',
  cacheMiddlewareBefore,
  createCachingProxy(process.env.API_HOST_CONTATOS + '/api/v1/contatos', parseInt(process.env.CACHE_TTL, 10) || 300)
);

export default router;
