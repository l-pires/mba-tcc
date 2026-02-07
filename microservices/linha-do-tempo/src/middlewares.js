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
