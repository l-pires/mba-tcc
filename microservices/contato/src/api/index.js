import express from 'express';

import ContatoService from '../service/index.js';


const router = express.Router();
const service = new ContatoService();

router.get('/', (req, res) => {
  res.json({
    version: process.env.npm_package_version,
  });
});

router.get('/contatos', (req, res) => {
  res.json(service.getContatos());
});

router.get('/contatos/repo', (req, res) => {
  res.json(service.getRepo());
});

export default router;
