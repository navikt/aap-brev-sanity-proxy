
import { genererHtml } from './components/GenererHtml';
import { assertValue } from './envUtils';
import { GenererPdfRequest } from './pdfModell';

const pdfgeneratorUrl = assertValue(process.env.PDFGENERATOR_SAKSBEHANDLING_URL, 'Missing environment variable: PDFGENERATOR_SAKSBEHANDLING_URL');

export async function brevmalToPdfNyPdfgenerator(request: GenererPdfRequest) {
  const html = genererHtml(request);

  const pdf = await fetch(pdfgeneratorUrl + '/api/v1/genpdf/html/saksbehandling', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
      Accept: 'application/pdf',
    },
    body: html,
  });

  return pdf.arrayBuffer();
}
