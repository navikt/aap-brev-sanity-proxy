export type Innhold = {
  language?: string;
  overskrift: string;
  riktekst: Array<Content>;
  kanRedigeres: boolean;
  erFullstendig: boolean;
};

export type Content = {
  children: Array<Tekst | Faktagrunnlag>;
  style?: "normal";
  listItem?: "bullet";
  level?: number;
};

export type Tekst = {
  marks: Array<Mark>;
  text: string;
  _type: "tekst";
};

export type Mark = "underline" | "em" | "strong";

export type Faktagrunnlag = {
  _ref: string;
  _type: "faktagrunnlag";
};
