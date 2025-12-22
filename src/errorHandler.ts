import { ErrorRequestHandler } from 'express-serve-static-core';
import { logger } from '@navikt/pino-logger';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (process.env.NODE_ENV === 'development') {
    console.error('Unhåndtert feil', err);
  } else {
    logger.error(err, 'Unhåndtert feil');
  }

  res.status(500).end();
};
