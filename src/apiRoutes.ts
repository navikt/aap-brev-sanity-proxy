import express from "express";
import { Språk } from "./språk.js";
import { Brevtype } from "./brevtype.js";
import { flettBrev } from "./brevService.js";

const router = express.Router();

router.get("/mal", async (req, res, next) => {
  const brevtype = Object.values(Brevtype).find(
    (x) => x === req.query["brevtype"],
  );
  if (!brevtype) {
    return res.status(400).send("Mangler brevtype");
  }

  const språk = Object.values(Språk).find((x) => x === req.query["sprak"]);
  if (!språk) {
    return res.status(400).send("Mangler språk");
  }

  try {
    const flettetBrev = await flettBrev(brevtype, språk);
    res.send(flettetBrev);
  } catch (err) {
    next(err);
  }
});

export default router;
