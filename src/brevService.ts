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
  [Brevtype.VEDTAK_11_17]: '7365300c-6651-4b92-a2d9-6accd8b89b16',
  [Brevtype.VEDTAK_11_18]: 'd27e357b-bc38-4c8c-8ae5-4e398fc854a3',
  [Brevtype.VEDTAK_11_23_SJETTE_LEDD]: '2f904e2e-abde-4bda-9613-851845be2dc9',
  [Brevtype.AVSLAG]: '540d061b-0772-4e78-b078-40483c0192f2',
  [Brevtype.VARSEL_OM_BESTILLING]: 'c16dc9a8-d41c-4a73-bc79-af95902d40c3',
  [Brevtype.FORHÅNDSVARSEL_BRUDD_AKTIVITETSPLIKT]: '1da6c37e-f9d4-46ca-8bc0-81430c91b84d',
  [Brevtype.VEDTAK_11_7]: '49d079b8-bdad-42f8-9e0b-a39b2674baad',
  [Brevtype.VEDTAK_11_9]: 'd823bd4a-c1fc-4574-91c0-7c5d6e9052e1',
  [Brevtype.FORVALTNINGSMELDING]: '7a5b29f5-0fe5-4ce4-91df-6f03adeb0081',
  [Brevtype.VEDTAK_ENDRING]: '34c2c2ad-2d93-4989-96e5-1701c0313542',
  [Brevtype.KLAGE_AVVIST]: '299aea66-6d90-4b81-b217-cca24fab359a',
  [Brevtype.KLAGE_OPPRETTHOLDELSE]: 'c312cb2e-46f6-4296-97a9-c05b2309fcb5',
  [Brevtype.KLAGE_TRUKKET]: 'dc797205-0fd9-4c3b-87f1-03f3ad345fab',
  [Brevtype.FORHÅNDSVARSEL_KLAGE_FORMKRAV]: '8f5bb5df-ea9b-4efb-a571-bb551984347c',
  [Brevtype.OMGJØRING_VEDTAK_11_9]: 'ee6ae0d1-d3d3-419c-9ecc-145b38814cf6',
};
