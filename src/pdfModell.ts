import { PortableTextBlock } from '@portabletext/react';

export interface Mottaker {
  navn: string;
  ident: string;
  identType: 'FNR' | 'HPRNR';
}

export interface Signatur {
  navn: string;
  enhet: string;
}

export interface GenererPdfRequest {
  overskrift: string;
  mottaker: Mottaker;
  saksnummer: string;
  dato: string;
  signaturer: Signatur[];
  brevmal: PortableTextBlock; // TODO lage type for brevmal
  // brevdata: Brevdata // TODO
}
