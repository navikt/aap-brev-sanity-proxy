import { NextFunction, Request, Response } from 'express-serve-static-core';
import { getToken, validateAzureToken } from '@navikt/oasis';
import { logger } from '@navikt/pino-logger';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info('Skip validation for development!');
    return next();
  }

  const token = getToken(req);
  if (!token) {
    return res.status(401).send();
  }

  const validationResult = await validateAzureToken(token);

  if (validationResult.ok) {
    return next();
  } else {
    return res.status(401).send();
  }
};
