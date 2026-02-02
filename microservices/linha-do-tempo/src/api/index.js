import express from 'express';

import LinhaDoTempoService from '../service/index.js';


const router = express.Router();
const service = new LinhaDoTempoService();

router.get("/", (req, res) => {
  res.json({
    version: process.env.npm_package_version,
  });
});

router.get("/linha-do-tempo", (req, res) => {
  res.json(service.getMarcos());
});

export default router;
