import rateLimit from 'express-rate-limit';


const defaultWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60 * 1000;
const defaultMax = parseInt(process.env.RATE_LIMIT_MAX, 10) || 100;
const defaultMessage = process.env.RATE_LIMIT_MESSAGE || 'Too many requests, please try again later.';

export const rateLimiter = rateLimit({
  windowMs: defaultWindowMs,
  max: defaultMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: defaultMessage,
});

export function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || defaultWindowMs;
  const max = options.max || defaultMax;
  const message = options.message || defaultMessage;

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message,
  });
}

export function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
};

export function errorHandler(err, req, res, _next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  
  const body = {
    message: err.message,
  };

  if (process.env.NODE_ENV === 'development') {
    body.stack = err.stack;
  }

  res.json(body);
};
