import express from "express";

const router = express.Router();

router.get("/", async (_, res) => {
  res.send({ hello: "world" });
});

export default router;
