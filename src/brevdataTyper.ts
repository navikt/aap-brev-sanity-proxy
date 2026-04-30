export interface BrevdataType {
  delmaler: {
    id: string;
  }[];
  faktagrunnlag: {
    tekniskNavn: string;
    verdi: string;
  }[];
  tabeller: {
    tekniskNavn: string;
    rader: {
      celler: {
        kolonne: string
        verdi: string;
      }[];
    }[];
  }[];
  valg: {
    id: string;
    key: string;
  }[];
  fritekster: {
    parentId: string;
    key: string;
    fritekst: {
      tekst: string;
    };
  }[];
  betingetTekst: {
    id: string;
  }[];
}
