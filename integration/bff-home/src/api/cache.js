import { createClient } from 'redis';

let client = null;
let isConnected = false;

export async function initRedis() {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  
  client = createClient({
    url: redisUrl,
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 500),
    },
  });

  client.on('error', (err) => console.error('Redis error:', err));
  
  client.on('connect', () => {
    console.log('Redis connected');
    isConnected = true;
  });

  client.on('disconnect', () => {
    console.log('Redis disconnected');
    isConnected = false;
  });

  try {
    await client.connect();
  } catch (err) {
    console.warn('Failed to connect to Redis, running without cache:', err.message);
    isConnected = false;
  }
}

export async function closeRedis() {
  if (client) {
    await client.quit();
  }
}

export function getClient() {
  return client;
}

export function isReady() {
  return isConnected && client;
}

export async function getCached(key) {
  if (!isReady()) return null;
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error('Cache get error:', err);
    return null;
  }
}

export async function setCached(key, value, ttlSeconds = 300) {
  if (!isReady()) return;
  try {
    const json = JSON.stringify(value);
    await client.setEx(key, ttlSeconds, json);
  } catch (err) {
    console.error('Cache set error:', err);
  }
}

export async function clearCached(key) {
  if (!isReady()) return;
  try {
    await client.del(key);
  } catch (err) {
    console.error('Cache clear error:', err);
  }
}

export async function clearCachedPattern(pattern) {
  if (!isReady()) return;
  try {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
  } catch (err) {
    console.error('Cache clear pattern error:', err);
  }
}
