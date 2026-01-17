import express from 'express';


const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    version: process.env.npm_package_version,
  });
});

export default router;
