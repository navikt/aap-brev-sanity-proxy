export type Brev = {
  overskrift?: string;
  tekstbolker: Array<Tekstbolk>;
};
export type Tekstbolk = {
  overskrift?: string;
  innhold: Array<Innhold>;
};

export type Innhold = {
  sprak?: string;
  overskrift: string;
  avsnitt: Array<Avsnitt>;
  kanRedigeres: boolean;
  erFullstendig: boolean;
};

export type Avsnitt = {
  tekst: Array<Tekst>;
  listeInnrykk?: number;
};

export type Tekst = FormattertTekst | Faktagrunnlag;

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
