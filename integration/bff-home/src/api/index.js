import express from 'express';

import { getCached, setCached } from './cache.js';


const router = express.Router();
const ttlSeconds = parseInt(process.env.CACHE_TTL, 10) || 300;
const cacheKey = (req) => `${req.method}:${req.originalUrl}`;

router.get('/', (req, res) => {
  res.json({
    message: 'bff-home running...',
    version: process.env.npm_package_version,
  });
});

// check cache middleware
router.use(async (req, res, next) => {
  if (req.method !== 'GET') return next();
  try {
    const cached = await getCached(cacheKey(req));
    if (cached) {
      res.set('X-Cache', 'HIT');
      return res.json(cached);
    }
  } catch (err) {
    console.error('cacheMiddlewareBefore error', err);
  }
  return next();
});

async function cacheAndProxyResponse(proxyRequest, proxyResponse, apiResponse) {
  const data = await apiResponse.json();

  proxyResponse.set('X-Cache', 'MISS');
  setCached(cacheKey(proxyRequest), data, ttlSeconds).catch((e) => console.error('setCached error', e));

  proxyResponse.set('X-api-name', 'bff-home');
  proxyResponse.json(data);
}

router.get('/api/v1/sobre', async (req, res) => {
  const apiResponse = await fetch(`${process.env.API_HOST_SOBRE}/api/v1/sobre`);
  cacheAndProxyResponse(req, res, apiResponse);
});

router.get('/api/v1/sobre/intro', async (req, res) => {
  const apiResponse = await fetch(`${process.env.API_HOST_SOBRE}/api/v1/sobre/intro`);
  cacheAndProxyResponse(req, res, apiResponse);
});

router.get('/api/v1/sobre/objetivo', async (req, res) => {
  const apiResponse = await fetch(`${process.env.API_HOST_SOBRE}/api/v1/sobre/objetivo`);
  cacheAndProxyResponse(req, res, apiResponse);
});


router.get('/api/v1/linha-do-tempo', async (req, res) => {
  const apiResponse = await fetch(`${process.env.API_HOST_MARCOS}/api/v1/linha-do-tempo`);
  cacheAndProxyResponse(req, res, apiResponse);
});

router.get('/api/v1/contatos', async (req, res) => {
  const apiResponse = await fetch(`${process.env.API_HOST_CONTATOS}/api/v1/contatos`);
  cacheAndProxyResponse(req, res, apiResponse);
});

export default router;
