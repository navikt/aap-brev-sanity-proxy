import React from 'react';
import { PortableText, PortableTextReactComponents, PortableTextTypeComponent } from '@portabletext/react';
import { style } from './style';
import { Mottaker as MottakerModell, Signatur as SignaturModell } from '../pdfModell';
import { Header } from './Header';
import { Signatur } from './Signatur';
import { BetingetTekstType, BrevmalType, FritekstType, PortableTextFaktagrunnlag, ValgRef } from '../brevmalTyper';
import { BrevdataType } from '../brevdataTyper';

interface Props {
  mottaker: MottakerModell;
  saksnummer: string;
  brevmal: BrevmalType;
  brevdata: BrevdataType;
  dato: string;
  signaturer: SignaturModell[];
}

export const Brev = ({ mottaker, saksnummer, brevmal, brevdata, dato, signaturer }: Props) => {
  const overskrift = brevmal.overskrift;
  return (
    <html lang="nb-NO">
      <head>
        <meta charSet="UTF-8" />
        <title>{overskrift}</title>
        <meta name="description" content={overskrift} />
        <meta name="subject" content={overskrift} />
        <meta name="author" content="NAV IT" />
        <style>{style(mottaker.identType === 'FNR' ? saksnummer : undefined)}</style>
      </head>
      <body>
        <main>
          <Header mottaker={mottaker} saksnummer={saksnummer} dato={dato} />
          <div className="title-wrapper">
            <h1>{overskrift}</h1>
          </div>
          <div className="container">
            {brevmal.delmaler
              .filter((delmalRef) => brevdata.delmaler.find((valgtDelmal) => valgtDelmal.id === delmalRef.delmal._id))
              .map((delmalRef) => (
                <>
                  <h2>{delmalRef.delmal.overskrift}</h2>
                  <PortableText
                    value={delmalRef.delmal.teksteditor}
                    components={brevmalPortableTextReactComponents(delmalRef.delmal._id, brevdata)}
                  />
                </>
              ))}
          </div>
          <Signatur signaturer={signaturer} />
        </main>
      </body>
    </html>
  );
};

const brevmalPortableTextReactComponents = (
  delmalId: string,
  brevdata: BrevdataType
): Partial<PortableTextReactComponents> => ({
  types: {
    faktagrunnlag: FaktagrunnlagComponent(brevdata),
    valgRef: ValgComponent(brevdata),
    fritekst: FritekstComponent(delmalId, brevdata),
    betingetTekstRef: BetingetTekstComponent(brevdata),
  },
});

const FaktagrunnlagComponent: (brevdata: BrevdataType) => PortableTextTypeComponent<PortableTextFaktagrunnlag> = (
  brevdata
) => {
  return (props) => {
    const verdi =
      brevdata.faktagrunnlag.find((x) => x.tekniskNavn === props.value.tekniskNavn)?.verdi ??
      `<${props.value.visningsnavn}>`;

    return <span>{verdi}</span>;
  };
};

const ValgComponent: (brevdata: BrevdataType) => PortableTextTypeComponent<ValgRef> = (brevdata) => {
  return (props) => {
    const valgData = brevdata.valg.find((valg) => valg.id === props.value.valg._id);
    const alternativ = props.value.valg.alternativer.find((alternativ) => alternativ._key === valgData?.key);
    switch (alternativ?._type) {
      case 'kategorisertTekstRef':
        return (
          <PortableText
            value={alternativ.tekst.teksteditor}
            components={{ types: { faktagrunnlag: FaktagrunnlagComponent(brevdata) } }}
          />
        );
      case 'fritekst': {
        const fritekst = brevdata.fritekster.find(
          (fritekst) => fritekst.parentId === props.value.valg._id && alternativ._key === fritekst.key
        )?.fritekst;
        if (fritekst) {
          return <span>{fritekst}</span>; // TODO fritekst er lagt opp til å være JSON, visning må endres når vi vet struktur
        }
        return null;
      }
      default:
        return null;
    }
  };
};

const FritekstComponent: (delmalId: string, brevdata: BrevdataType) => PortableTextTypeComponent<FritekstType> = (
  delmalId,
  brevdata
) => {
  return (props) => {
    const fritekst = brevdata.fritekster.find(
      (fritekst) => fritekst.parentId === delmalId && fritekst.key === props.value._key
    )?.fritekst;
    if (fritekst) {
      return <span>{fritekst}</span>; // TODO fritekst er lagt opp til å være JSON, visning må endres når vi vet struktur
    }
    return null;
  };
};

const BetingetTekstComponent: (brevdata: BrevdataType) => PortableTextTypeComponent<BetingetTekstType> = (brevdata) => {
  return (props) => {
    if (brevdata.betingetTekst.find((betingetTekst) => betingetTekst.id === props.value.tekst._id)) {
      return (
        <PortableText
          value={props.value.tekst.teksteditor}
          components={{ types: { faktagrunnlag: FaktagrunnlagComponent(brevdata) } }}
        />
      );
    }
    return null;
  };
};
