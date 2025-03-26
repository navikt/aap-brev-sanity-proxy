import { ClientPerspective, createClient } from '@sanity/client';

import { apiVersion, dataset, projectId, useCdn, sanityReadToken, perspective } from './env.js';

export const client = createClient({
  projectId,
  dataset,
  useCdn,
  apiVersion,
  token: sanityReadToken,
  perspective: perspective as ClientPerspective,
});
