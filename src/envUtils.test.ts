import { afterEach, describe, expect, it, vi } from 'vitest';

import { isDevGcp} from './envUtils';

describe('isDevGcp', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('er true i dev-gcp', () => {
    vi.stubEnv('NAIS_CLUSTER_NAME', 'dev-gcp');

    expect(isDevGcp()).toBe(true);
  });

  it('er false i prod-gcp', () => {
    vi.stubEnv('NAIS_CLUSTER_NAME', 'prod-gcp');

    expect(isDevGcp()).toBe(false);
  });

  it('er false når NAIS_CLUSTER_NAME mangler', () => {
    vi.stubEnv('NAIS_CLUSTER_NAME', undefined);

    expect(isDevGcp()).toBe(false);
  });

  it('er false når NAIS_CLUSTER_NAME er tom', () => {
    vi.stubEnv('NAIS_CLUSTER_NAME', '');

    expect(isDevGcp()).toBe(false);
  });

  it('er false for ukjent klynge', () => {
    vi.stubEnv('NAIS_CLUSTER_NAME', 'prod-fss');

    expect(isDevGcp()).toBe(false);
  });

});
