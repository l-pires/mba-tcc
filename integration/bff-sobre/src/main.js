import app from './app.js';
import { initRedis, closeRedis } from './api/cache.js';

const port = process.env.PORT || 3053;

async function start() {
  await initRedis();

  const server = app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down...');
    server.close(async () => {
      await closeRedis();
      process.exit(0);
    });
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
