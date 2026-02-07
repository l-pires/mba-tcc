import express from 'express';

import SobreService from '../service/index.js';


const router = express.Router();
const service = new SobreService();

router.get("/", (req, res) => {
  res.json({
    version: process.env.npm_package_version,
  });
});

router.get('/sobre', (req, res) => {
  res.json(service.getSobre());
});

router.get('/sobre/intro', (req, res) => {
  res.json(service.getIntro());
});

router.get('/sobre/contexto', (req, res) => {
  res.json(service.getContexto());
});

router.get('/sobre/objetivo', (req, res) => {
  res.json(service.getObjetivo());
});

router.get('/sobre/estrutura', (req, res) => {
  res.json(service.getEstrutura());
});


export default router;
