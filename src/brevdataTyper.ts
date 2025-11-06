export interface BrevdataType {
  delmaler: ValgtDelmalType[];
  faktagrunnlag: FaktagrunnlagMedVerdiType[];
}

export interface ValgtDelmalType {
  id: string;
}
export interface FaktagrunnlagMedVerdiType {
  tekniskNavn: string;
  verdi: string;
}
