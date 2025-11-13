export interface BrevdataType {
  delmaler: {
    id: string;
  }[];
  faktagrunnlag: {
    tekniskNavn: string;
    verdi: string;
  }[];
  valg: {
    id: string;
    key: string;
  }[];
  fritekst: {
    parentId: string;
    key: string;
    fritekst: string;
  }[];
  betingetTekst: {
    id: string;
  }[];
}
