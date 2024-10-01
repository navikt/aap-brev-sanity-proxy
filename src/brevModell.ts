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
  blokker: Array<Blokk>;
  kanRedigeres: boolean;
  erFullstendig: boolean;
};

export type Blokk = {
  innhold: Array<BlokkInnhold>;
  type: BlokkType;
};

export type BlokkType = "avsnitt" | "liste";

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
