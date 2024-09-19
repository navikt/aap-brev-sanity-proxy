import { client } from "./client.js";

export interface EnkelBrevmal {
  brevtittel: string;
  _id: string;
  brevtype: string;
}

const brevtyperGroq = `
*[_type=='brevtype']{
  _id,
  overskrift,
  tekstbolker
}`;

const tekstbolkGroq = `
*[_type=='tekstbolk']{
  overskrift,
  innhold,
}`;

const innholdGroq = `
*[_type=='innhold']`;

const faktagrunnlagGroq = `
*[_type=='faktagrunnlag']`;

export const getBrevtyper = async (): Promise<object[]> => {
  return await client.fetch(brevtyperGroq);
};

export const getTekstbolker = async (): Promise<object[]> => {
  return await client.fetch(tekstbolkGroq);
};

export const getInnhold = async (): Promise<object[]> => {
  return await client.fetch(innholdGroq);
};

export const getFaktagrunnlag = async (): Promise<object[]> => {
  return await client.fetch(faktagrunnlagGroq);
};
