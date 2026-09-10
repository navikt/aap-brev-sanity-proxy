const DEV_CLUSTER = 'dev-gcp';

export const isDevGcp = (): boolean => process.env.NAIS_CLUSTER_NAME === DEV_CLUSTER;

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
