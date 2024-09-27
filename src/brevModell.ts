export type Brevtype = {
  overskrift?: string;
  tekstbolker: Array<Tekstbolk>;
};
export type Tekstbolk = {
  overskrift?: string;
  innhold: Array<Innhold>;
};

export type Innhold = {
  language?: string;
  overskrift: string;
  riktekst: Array<Tekst>;
  kanRedigeres: boolean;
  erFullstendig: boolean;
};

export type Tekst = {
  children: Array<Segment | Faktagrunnlag>;
  listeInnrykk?: number;
};

export type Segment = {
  formattering: Array<Formattering>;
  text: string;
  tekstType: "tekst";
};

export type Formattering = "underline" | "em" | "strong";

export type Faktagrunnlag = {
  visningsnavn: string;
  tekniskNavn: string;
  tekstType: "faktagrunnlag";
};
