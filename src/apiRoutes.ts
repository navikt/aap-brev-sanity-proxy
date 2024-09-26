import express from "express";
import {
  getBrevtyper,
  getFaktagrunnlag,
  getInnhold,
  getTekstbolker,
} from "./sanity/brevQueries.js";
import { flettTekstbolk } from "./brevfletter.js";

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
  const innhold = await getInnhold();
  res.send(innhold);
});

router.get("/faktagrunnlag", async (_, res) => {
  const faktagrunnlag = await getFaktagrunnlag();
  res.send(faktagrunnlag);
});

router.get("/flettet", async (_, res) => {
  const tekstbolker = await getTekstbolker();
  const innhold = await getInnhold();
  const faktagrunnlag = await getFaktagrunnlag();
  const flettetBrev = tekstbolker.map((tekstbolk) =>
    flettTekstbolk(tekstbolk, innhold, faktagrunnlag),
  );
  res.send(flettetBrev);
});

export default router;
