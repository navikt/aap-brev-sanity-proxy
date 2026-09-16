import { initialize } from 'unleash-client';
import { assertValue } from './envUtils';

const url = assertValue(process.env.UNLEASH_SERVER_API_URL, 'missing required env UNLEASH_SERVER_API_URL');
const environment = assertValue(process.env.UNLEASH_SERVER_API_ENV, 'missing required env UNLEASH_SERVER_API_ENV');
const token = assertValue(process.env.UNLEASH_SERVER_API_TOKEN, 'missing required env UNLEASH_SERVER_API_TOKEN');

export const unleash = initialize({
  appName: 'aap-brev-sanity-proxy',
    url: `${url}/api`,
    environment,
  customHeaders: {
    Authorization: token,
  },
});
