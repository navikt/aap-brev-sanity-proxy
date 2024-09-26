import { LocaleString } from "@navikt/aap-sanity-schema-types/sanity-schema";

export type Tekstbolk = {
  overskrift?: LocaleString; // TODO: endre til string
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
