export interface BrevdataType {
  delmaler: {
    id: string;
  }[];
  faktagrunnlag: {
    tekniskNavn: string;
    verdi: string;
  }[];
  fritekst: {
    parentId: string;
    key: string;
    fritekst: string;
  }[];
}
