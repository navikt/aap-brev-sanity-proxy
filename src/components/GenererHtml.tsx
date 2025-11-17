import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Brev } from './Brev';
import { GenererPdfRequest } from '../pdfModell';

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
