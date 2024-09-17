import express from "express";

const router = express.Router();

router.get("/health/isAlive", (_, res) => {
  res.status(200).end();
});

router.get("/health/isReady", (_, res) => {
  res.status(200).end();
});

export default router;
