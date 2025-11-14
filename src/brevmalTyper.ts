import { PortableTextBlock } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

export interface TekstType extends TypedObject {
  _id: string;
  _type: 'tekst';
  beskrivelse: string;
  teksteditor: PortableTextBlock[];
}

export interface BetingetTekstType extends TypedObject {
  _key: string;
  _type: 'betingetTekstRef';
  tekst: TekstType;
}

export interface PeriodetekstType extends TypedObject {
  _key: string;
  _type: 'periodetekstRef';
  periodetekst: TekstType;
}

export interface KategorisertTekstRef extends TypedObject {
  _key: string;
  _type: 'kategorisertTekstRef';
  tekst: TekstType;
}

export interface FritekstType extends TypedObject {
  _key: string;
  _type: 'fritekst';
}

export interface ValgType extends TypedObject {
  _id: string;
  _type: 'valg';
  alternativer: (KategorisertTekstRef | FritekstType)[];
}

export interface ValgRef extends TypedObject {
  _key: string;
  _type: 'valgRef';
  obligatorisk: boolean;
  valg: ValgType;
}

export interface PortableTextFaktagrunnlag extends TypedObject {
  _type: 'faktagrunnlag';
  visningsnavn: string;
  tekniskNavn: string;
}

export type EditorTypes = BetingetTekstType | PortableTextBlock | ValgRef | FritekstType;

export interface DelmalType extends TypedObject {
  _id: string;
  _type: 'delmal';
  overskrift?: string | null;
  teksteditor: EditorTypes[];
}

export interface DelmalReferanse extends TypedObject {
  _key: string;
  _type: 'delmalRef';
  delmal: DelmalType;
}

export interface BrevmalType extends TypedObject {
  _type: 'mal';
  overskrift: string;
  delmaler: DelmalReferanse[];
}
