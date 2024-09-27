import {
  getBrevtyper,
  getFaktagrunnlag,
  getInnhold,
  getTekstbolker,
} from "./sanity/brevQueries.js";
import { flettBrevtype } from "./brevfletter.js";
import { Språk } from "./språk.js";
import { Brevtype } from "./brevtype.js";

export async function flettBrev(ønsketBrevtype: Brevtype, ønsketSpråk: Språk) {
  const brevtypeId = brevtypeTilSanityId[ønsketBrevtype];
  if (brevtypeId instanceof Error) {
    throw brevtypeId;
  }

  const brevtyper = await getBrevtyper();
  const tekstbolker = await getTekstbolker();
  const innhold = await getInnhold();
  const faktagrunnlag = await getFaktagrunnlag();
  const brevtype = brevtyper.find((x) => x._id === brevtypeId);

  if (!brevtype) {
    throw new Error(
      `Fant ikke brevtype med id ${brevtypeId} for brevtype ${ønsketBrevtype}`,
    );
  }

  return flettBrevtype(
    brevtype,
    tekstbolker,
    innhold,
    faktagrunnlag,
    ønsketSpråk,
  );
}

const brevtypeTilSanityId = {
  [Brevtype.INNVILGELSE]: "37594d86-38d4-4f2a-9b75-cdc0cbe02e08",
  [Brevtype.AVSLAG]: new Error("Mangler id for brevtype AVSLAG"),
};
