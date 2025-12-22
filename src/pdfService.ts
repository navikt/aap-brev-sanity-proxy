import { genererHtml } from './components/GenererHtml';
import { assertValue } from './envUtils';
import { GenererPdfRequest } from './pdfModell';

const pdfgenUrl = assertValue(process.env.PDF_GEN_URL, 'Missing environment variable: PDF_GEN_URL');

export async function brevmalToPdf(request: GenererPdfRequest) {
  const html = genererHtml(request);
  const pdf = await fetch(pdfgenUrl + '/api/v1/genpdf/html/aap-saksbehandling-pdfgen', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
      Accept: 'application/pdf',
    },
    body: html,
  });

  return pdf.arrayBuffer();
}
