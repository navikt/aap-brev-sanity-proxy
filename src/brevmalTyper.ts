import { PortableTextBlock } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

interface SanitySystemType {
  base: {
    id: string;
    rev: string;
  };
}

interface SanityAttributes {
  _createdAt: string;
  _id: string;
  _originalId: string;
  _rev: string;
  _system?: SanitySystemType;
  _type: Innholdstype;
  _updatedAt: string;
}

type Innholdstype = 'mal' | 'delmal' | 'valg' | 'tekst';

export interface TekstType extends SanityAttributes {
  beskrivelse: string;
  teksteditor: PortableTextBlock[];
}

export interface BetingetTekstType extends TypedObject {
  _key: string;
  _type: 'betingetTekstRef';
  kategorier: string | null;
  tekst: TekstType;
}

export interface AlternativType extends TypedObject {
  _key: string;
  _type: 'valgRef';
  kategori: string | null;
  tekst: TekstType;
}

export interface KategorisertTekstRef extends TypedObject {
  _key: string;
  _type: 'kategorisertTekstRef';
  kategori: string | null;
  tekst: TekstType;
}

export interface FritekstType extends TypedObject {
  _key: string;
  _type: 'fritekst';
}

export interface ValgType extends SanityAttributes {
  alternativer: (AlternativType | FritekstType | KategorisertTekstRef)[];
  beskrivelse: string;
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

export interface DelmalType extends SanityAttributes {
  _id: string;
  _type: 'delmal';
  internTittel: string; // TODO deprecated skal bort
  beskrivelse: string;
  overskrift?: string | null;
  paragraf?: string; // TODO skal bort
  teksteditor: EditorTypes[];
}

export interface DelmalReferanse extends TypedObject {
  _key: string;
  _type: 'delmalRef';
  delmal: DelmalType;
  obligatorisk: boolean;
}

export interface BrevmalType extends SanityAttributes {
  beskrivelse: string;
  overskrift: string;
  internTittel: string; // TODO Deprecated
  journalposttittel: string | null; // TODO må settes?
  kanSendesAutomatisk: boolean | null; // TODO default false?
  delmaler: DelmalReferanse[];
}
