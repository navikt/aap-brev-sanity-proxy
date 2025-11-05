import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Brev } from './Brev';
import { GenererPdfRequest } from '../pdfModell';

export const genererHtml = (request: GenererPdfRequest) => {
  return renderToStaticMarkup(
    <Brev
      overskrift={request.overskrift}
      mottaker={request.mottaker}
      saksnummer={request.saksnummer}
      brevmal={request.brevmal}
      dato={request.dato}
      signaturer={request.signaturer}
    />
  );
};
