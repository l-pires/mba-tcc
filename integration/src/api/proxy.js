import { createProxyMiddleware } from 'http-proxy-middleware';
import { getCached, setCached } from './cache.js';


function cacheKey(req) {
  return `${req.method}:${req.originalUrl}`;
}

export async function cacheMiddlewareBefore(req, res, next) {
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
}

export function createCachingProxy(targetUrl, ttlSeconds = 300) {
  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    on: {
      proxyRes: (proxyRes, req, res) => {
        proxyRes.headers['X-Cache'] = 'MISS';

        try {
          const chunks = [];
          proxyRes.on('data', (chunk) => chunks.push(chunk));
          proxyRes.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const contentType = proxyRes.headers['content-type'] || '';

            if (contentType.includes('application/json')) {
              try {
                const text = buffer.toString('utf8');
                const body = JSON.parse(text);
                setCached(cacheKey(req), body, ttlSeconds).catch((e) => console.error('setCached error', e));
                return res.json(body);
              } catch (err) {
                console.warn('Failed to parse proxied JSON for caching', err.message);
              }
            }

            return res.end(buffer);
          });
        } catch (err) {
          console.error('on.proxyRes handler error', err);
          res.status(502).json({ message: 'Bad Gateway' });
        }
      }
    },
  });
}
