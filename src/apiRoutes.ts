import express from 'express';
import { isDevGcp } from './envUtils';
import { flettBrev } from './brevService.js';
import { hentBrevmal } from './brevmalService';
import { Brevtype } from './brevtype.js';
import { genererHtml, genererJSON } from './components/GenererHtml';
import { GenererPdfRequest } from './pdfModell';
import { brevmalToPdf, brevmalToPdfNyPdfgenerator } from './pdfService';
import { Språk } from './språk.js';

const router = express.Router();

router.get('/mal', async (req, res, next) => {
  const brevtype = Object.values(Brevtype).find((x) => x === req.query['brevtype']);
  if (!brevtype) {
    return res.status(400).send('Mangler brevtype');
  }

  const språk = Object.values(Språk).find((x) => x === req.query['sprak']);
  if (!språk) {
    return res.status(400).send('Mangler språk');
  }

  try {
    const flettetBrev = await flettBrev(brevtype, språk);
    res.send(flettetBrev);
  } catch (err) {
    next(err);
  }
});

// Ny brevmodell
router.get('/brevmal', async (req, res, next) => {
  const brevtype = Object.values(Brevtype).find((x) => x === req.query['brevtype']);
  if (!brevtype) {
    return res.status(400).send('Mangler brevtype');
  }

  const språk = Object.values(Språk).find((x) => x === req.query['sprak']);
  if (!språk) {
    return res.status(400).send('Mangler språk');
  }

  try {
    const brevmal = await hentBrevmal(brevtype, språk);
    res.send(brevmal);
  } catch (err) {
    next(err);
  }
});

router.post('/html-preview', async (req, res, next) => {
  try {
    const json: GenererPdfRequest = req.body;
    const markup = genererHtml(json);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(markup);
  } catch (err) {
    next(err);
  }
});

router.post('/brevbygger-preview', async (req, res, next) => {
  try {
    const json: GenererPdfRequest = req.body;
    const markup = genererJSON(json);

    res.header('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(markup);
  } catch (err) {
    next(err);
  }
});

router.post('/pdf', async (req, res, next) => {
  try {
    const json: GenererPdfRequest = req.body;
    const pdf = isDevGcp() ? await brevmalToPdfNyPdfgenerator(json) : await brevmalToPdf(json);

    res.header('Content-Type', 'application/pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdf));
  } catch (err) {
    next(err);
  }
});

export default router;
