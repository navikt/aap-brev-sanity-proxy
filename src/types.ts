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
  _type: "tekst";
};

export type Formattering = "underline" | "em" | "strong";

export type Faktagrunnlag = {
  _ref: string;
  _type: "faktagrunnlag";
};
