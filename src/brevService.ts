import { getBrevtyper, getFaktagrunnlag, getInnhold, getTekstbolker } from './sanity/brevQueries.js';
import { flettBrevtype } from './brevfletter.js';
import { Språk } from './språk.js';
import { Brevtype } from './brevtype.js';

export async function flettBrev(ønsketBrevtype: Brevtype, ønsketSpråk: Språk) {
  const brevtypeId = brevtypeTilSanityId[ønsketBrevtype];
  const brevtyper = await getBrevtyper();
  const tekstbolker = await getTekstbolker();
  const innhold = await getInnhold();
  const faktagrunnlag = await getFaktagrunnlag();
  const brevtype = brevtyper.find((x) => x._id === brevtypeId);

  if (!brevtype) {
    throw new Error(`Fant ikke brevtype med id ${brevtypeId} for brevtype ${ønsketBrevtype}`);
  }

  return flettBrevtype(brevtype, tekstbolker, innhold, faktagrunnlag, ønsketSpråk);
}

const brevtypeTilSanityId = {
  [Brevtype.INNVILGELSE]: '37594d86-38d4-4f2a-9b75-cdc0cbe02e08',
  [Brevtype.AVSLAG]: '540d061b-0772-4e78-b078-40483c0192f2',
  [Brevtype.VARSEL_OM_BESTILLING]: '3f5adce0-bbc0-4ff8-aafe-0230f393882d', // TODO
  [Brevtype.FORHÅNDSVARSEL_BRUDD_AKTIVITETSPLIKT]: '1da6c37e-f9d4-46ca-8bc0-81430c91b84d',
};
