import { genererHtml } from './components/GenererHtml';
import { assertValue, isDevGcp } from './envUtils';
import { GenererPdfRequest } from './pdfModell';
import { logger } from '@navikt/pino-logger';
import { unleash } from './unleash';

const pdfgenUrl = assertValue(process.env.PDF_GEN_URL, 'Missing environment variable: PDF_GEN_URL');

export async function brevmalToPdf(request: GenererPdfRequest) {
  if(unleash.isEnabled('BrevSanityProxyTest')) {
    logger.info('BrevSanityProxyTest enabled' );
  }
  const html = genererHtml(request);
  if(isDevGcp()){
    logger.info(html);
  }
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
