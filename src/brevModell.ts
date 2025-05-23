export type Brev = {
  overskrift?: string;
  kanOverstyreBrevtittel?: boolean;
  journalpostTittel?: string;
  tekstbolker: Array<Tekstbolk>;
  kanSendesAutomatisk: boolean;
};

export type Tekstbolk = {
  id: string;
  overskrift?: string;
  innhold: Array<Innhold>;
};

export type Innhold = {
  id: string;
  overskrift?: string;
  blokker: Array<Blokk>;
  kanRedigeres: boolean;
  erFullstendig: boolean;
};

export type Blokk = {
  id: string;
  innhold: Array<BlokkInnhold>;
  type: BlokkType;
};

export enum BlokkType {
  AVSNITT = 'AVSNITT',
  LISTE = 'LISTE',
}

export type BlokkInnhold = FormattertTekst | Faktagrunnlag;

export type FormattertTekst = {
  id: string;
  tekst: string;
  formattering: Array<Formattering>;
  type: 'TEKST';
};

export enum Formattering {
  UNDERSTREK = 'UNDERSTREK',
  KURSIV = 'KURSIV',
  FET = 'FET',
}

export type Faktagrunnlag = {
  id: string;
  visningsnavn: string;
  tekniskNavn: string;
  type: 'FAKTAGRUNNLAG';
};
