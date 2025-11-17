import { BrevmalType } from './brevmalTyper';
import { BrevdataType } from './brevdataTyper';

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
  mottaker: Mottaker;
  saksnummer: string;
  dato: string;
  signaturer: Signatur[];
  brevmal: BrevmalType;
  brevdata: BrevdataType;
}
