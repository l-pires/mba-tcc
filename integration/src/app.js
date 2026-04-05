import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import api from './api/main.js';
import { notFound, errorHandler, rateLimiter } from './middlewares.js';


const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(rateLimiter);

app.use("/", api);

app.use(notFound);
app.use(errorHandler);

export default app;
