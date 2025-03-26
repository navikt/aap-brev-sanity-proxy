export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-27';

export const dataset = assertValue(process.env.SANITY_DATASET, 'Missing environment variable: SANITY_DATASET');

export const projectId = assertValue(process.env.SANITY_PROJECT_ID, 'Missing environment variable: SANITY_PROJECT_ID');

export const perspective = assertValue(
  process.env.SANITY_PERSPECTIVE,
  'Missing environment variable: SANITY_PERSPECTIVE'
);

export const sanityReadToken = assertValue(
  process.env.SANITY_API_READ_TOKEN,
  'Missing environment variable: SANITY_API_READ_TOKEN'
);

export const useCdn = false;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
