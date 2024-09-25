import { client } from "./client.js";
import { Brevtype, Faktagrunnlag, Innhold, Tekstbolk } from "./sanityTypes.js";

export interface EnkelBrevmal {
  brevtittel: string;
  _id: string;
  brevtype: string;
}

const brevtyperGroq = `
*[_type=='brevtype']`;

const tekstbolkGroq = `
*[_type=='tekstbolk']`;

const innholdGroq = `
*[_type=='innhold']`;

const faktagrunnlagGroq = `
*[_type=='faktagrunnlag']`;

export const getBrevtyper: () => Promise<Brevtype[]> = async () => {
  return await client.fetch(brevtyperGroq);
};

export const getTekstbolker: () => Promise<Tekstbolk[]> = async () => {
  return await client.fetch(tekstbolkGroq);
};

export const getInnhold: () => Promise<Innhold[]> = async () => {
  return await client.fetch(innholdGroq);
};

export const getFaktagrunnlag: () => Promise<Faktagrunnlag[]> = async () => {
  return await client.fetch(faktagrunnlagGroq);
};
