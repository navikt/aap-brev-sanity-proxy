import { Språk } from './språk.js';
import { Brevtype } from './brevtype.js';
import { client } from './sanity/client';
import { MalQuery } from './sanity/brevmalQuery';

// Ny brevmodell
export async function hentBrevmal(brevtype: Brevtype, språk: Språk) {
  const malId = brevtypeTilSanityId(brevtype);
  const res = await client.fetch(MalQuery, { id: malId, lang: språk });
  console.log(`Mal fra Sanity: ${JSON.stringify(res)}`);
  return res;
}

const brevtypeTilSanityId = (brevtype: Brevtype) => {
  switch (brevtype) {
    case Brevtype.INNVILGELSE:
      return 'f0af3bf5-0a3c-47a2-affb-94b2b544c710';
    case Brevtype.AVSLAG:
      return '40a9777b-b6fc-43b1-aec9-aa5d3357db7a';
    default:
      throw new Error(`Mangler mapping fra brevtype ${brevtype} til id`);
  }
};
