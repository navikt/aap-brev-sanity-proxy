import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Brev, DelmalEditor } from './Brev';
import { GenererPdfRequest } from '../pdfModell';
import { Header } from './Header';
import { Signatur } from './Signatur';

export const genererHtml = (request: GenererPdfRequest) => {
  return renderToStaticMarkup(
    <Brev
      mottaker={request.mottaker}
      saksnummer={request.saksnummer}
      brevmal={request.brevmal}
      brevdata={request.brevdata}
      dato={request.dato}
      signaturer={request.signaturer}
    />
  );
};

export const genererJSON = (request: GenererPdfRequest) => {
  const { mottaker, saksnummer, dato, brevmal, brevdata, signaturer } = request;

  const delmaler = brevmal.delmaler
    .filter((delmalRef) => brevdata.delmaler.find((valgtDelmal) => valgtDelmal.id === delmalRef.delmal._id))
    .map((delmalRef) => {
      return {
        key: delmalRef._key,
        content: renderToStaticMarkup(
          <div id={`brev_${delmalRef._key}`}>
            <h2>{delmalRef.delmal.overskrift}</h2>
            <DelmalEditor delmal={delmalRef.delmal} brevdata={brevdata} />
          </div>
        ),
      };
    });

  const json = {
    header: {
      content: renderToStaticMarkup(
        <>
          <Header mottaker={mottaker} saksnummer={saksnummer} dato={dato} />
          <div className="title-wrapper">
            <h1>{request.brevmal.overskrift}</h1>
          </div>
        </>
      ),
    },
    delmaler: delmaler,
    signaturer: {
      content: renderToStaticMarkup(<Signatur signaturer={signaturer} />),
    },
  };
  return JSON.stringify(json);
};
