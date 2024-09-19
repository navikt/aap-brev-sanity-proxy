import express from "express";
import {
  getBrevtyper,
  getFaktagrunnlag,
  getInnhold,
  getTekstbolker,
} from "./sanity/brevQueries.js";

const router = express.Router();

router.get("/brevtyper", async (_, res) => {
  const brevtyper = await getBrevtyper();
  res.send(brevtyper);
});

router.get("/tekstbolker", async (_, res) => {
  const tekstbolker = await getTekstbolker();
  res.send(tekstbolker);
});

router.get("/innhold", async (_, res) => {
  const tekstbolker = await getInnhold();
  res.send(tekstbolker);
});

router.get("/faktagrunnlag", async (_, res) => {
  const tekstbolker = await getFaktagrunnlag();
  res.send(tekstbolker);
});

export default router;
