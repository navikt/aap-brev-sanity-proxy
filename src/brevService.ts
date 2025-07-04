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
  [Brevtype.VARSEL_OM_BESTILLING]: 'c16dc9a8-d41c-4a73-bc79-af95902d40c3',
  [Brevtype.FORHÅNDSVARSEL_BRUDD_AKTIVITETSPLIKT]: '1da6c37e-f9d4-46ca-8bc0-81430c91b84d',
  [Brevtype.FORVALTNINGSMELDING]: '7a5b29f5-0fe5-4ce4-91df-6f03adeb0081',
  [Brevtype.VEDTAK_ENDRING]: '34c2c2ad-2d93-4989-96e5-1701c0313542',
  [Brevtype.KLAGE_AVVIST]: '299aea66-6d90-4b81-b217-cca24fab359a',
  [Brevtype.KLAGE_OPPRETTHOLDELSE]: 'c312cb2e-46f6-4296-97a9-c05b2309fcb5',
  [Brevtype.KLAGE_TRUKKET]: 'dc797205-0fd9-4c3b-87f1-03f3ad345fab',
  [Brevtype.FORHÅNDSVARSEL_KLAGE_FORMKRAV]: '8f5bb5df-ea9b-4efb-a571-bb551984347c',
};
