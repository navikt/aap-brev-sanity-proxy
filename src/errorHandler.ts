import { ErrorRequestHandler } from 'express-serve-static-core';
import { logger } from '@navikt/pino-logger';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  } else {
    const message = getErrorMessage(err);
    logger.error(err, message);
  }

  res.status(500).end();
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unhåndtert feil';
}
