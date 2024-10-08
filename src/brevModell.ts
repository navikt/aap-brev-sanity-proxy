export type Brev = {
  overskrift?: string;
  tekstbolker: Array<Tekstbolk>;
};
export type Tekstbolk = {
  overskrift?: string;
  innhold: Array<Innhold>;
};

export type Innhold = {
  overskrift: string;
  blokker: Array<Blokk>;
  kanRedigeres: boolean;
  erFullstendig: boolean;
};

export type Blokk = {
  innhold: Array<BlokkInnhold>;
  type: BlokkType;
};

export enum BlokkType {
  AVSNITT = "AVSNITT",
  LISTE = "LISTE",
}

export type BlokkInnhold = FormattertTekst | Faktagrunnlag;

export type FormattertTekst = {
  tekst: string;
  formattering: Array<Formattering>;
  type: "tekst";
};

export type Formattering = "understrek" | "kursiv" | "fet";

export type Faktagrunnlag = {
  visningsnavn: string;
  tekniskNavn: string;
  type: "faktagrunnlag";
};
