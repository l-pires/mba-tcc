import express from 'express';

import { cacheMiddlewareBefore, createCachingProxy } from './proxy.js';


const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api-gateway running...',
    version: process.env.npm_package_version,
  });
});

router.use(cacheMiddlewareBefore);

router.get('/api/v1/sobre',
  createCachingProxy(process.env.API_HOST_SOBRE + '/api/v1/sobre', parseInt(process.env.CACHE_TTL, 10) || 300)
);

router.get('/api/v1/linha-do-tempo',
  createCachingProxy(process.env.API_HOST_MARCOS + '/api/v1/linha-do-tempo', parseInt(process.env.CACHE_TTL, 10) || 300)
);

router.get('/api/v1/contatos',
  createCachingProxy(process.env.API_HOST_CONTATOS + '/api/v1/contatos', parseInt(process.env.CACHE_TTL, 10) || 300)
);

export default router;
