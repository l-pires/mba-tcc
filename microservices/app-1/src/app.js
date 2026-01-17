import express from 'express';
import morgan from 'morgan';

import api from './api/index.js';
import { notFound, errorHandler } from './middlewares.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'app-1 running...',
  });
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;
