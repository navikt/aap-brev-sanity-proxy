import express from "express";
import {
  getBrevtyper,
  getFaktagrunnlag,
  getInnhold,
  getTekstbolker,
} from "./sanity/brevQueries.js";
import { flettBrevtype } from "./brevfletter.js";
import { Språk } from "./types.js";

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

router.get("/flettet", async (req, res) => {
  const språk = Object.values(Språk).find((x) => x === req.query["sprak"]);
  if (!språk) {
    return res.status(400).send("Mangler språk");
  }
  const brevtyper = await getBrevtyper();
  const tekstbolker = await getTekstbolker();
  const innhold = await getInnhold();
  const faktagrunnlag = await getFaktagrunnlag();
  const flettetBrev = brevtyper.map((brevtype) =>
    flettBrevtype(brevtype, tekstbolker, innhold, faktagrunnlag, språk),
  );

  res.send(flettetBrev);
});

export default router;
