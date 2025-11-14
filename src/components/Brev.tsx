import React from 'react';
import { PortableText, PortableTextReactComponents, PortableTextTypeComponent } from '@portabletext/react';
import { style } from './style';
import { Mottaker as MottakerModell, Signatur as SignaturModell } from '../pdfModell';
import { Header } from './Header';
import { Signatur } from './Signatur';
import {
  BetingetTekstType,
  BrevmalType,
  DelmalType,
  FritekstType,
  PeriodetekstType,
  PortableTextFaktagrunnlag,
  TekstType,
  ValgRef,
} from '../brevmalTyper';
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
                  <DelmalEditor delmal={delmalRef.delmal} brevdata={brevdata} />
                </>
              ))}
          </div>
          <Signatur signaturer={signaturer} />
        </main>
      </body>
    </html>
  );
};

interface DelmalEditorProps {
  delmal: DelmalType;
  brevdata: BrevdataType;
}

const DelmalEditor = (props: DelmalEditorProps) => {
  return (
    <PortableText
      value={props.delmal.teksteditor}
      components={brevmalPortableTextReactComponents(props.delmal._id, props.brevdata)}
    />
  );
};

interface TeksteditorProps {
  tekst: TekstType;
  faktagrunnlag: { tekniskNavn: string; verdi: string }[];
}

const Teksteditor = (props: TeksteditorProps) => {
  return (
    <PortableText
      value={props.tekst.teksteditor}
      components={{ types: { faktagrunnlag: FaktagrunnlagComponent(props.faktagrunnlag) } }}
    />
  );
};

const brevmalPortableTextReactComponents = (
  delmalId: string,
  brevdata: BrevdataType
): Partial<PortableTextReactComponents> => ({
  types: {
    faktagrunnlag: FaktagrunnlagComponent(brevdata.faktagrunnlag),
    valgRef: ValgComponent(brevdata),
    fritekst: FritekstComponent(delmalId, brevdata),
    betingetTekstRef: BetingetTekstComponent(brevdata),
    periodetekstRef: PeriodetekstComponent(brevdata),
  },
});

const FaktagrunnlagComponent: (
  faktagrunnlag: { tekniskNavn: string; verdi: string }[]
) => PortableTextTypeComponent<PortableTextFaktagrunnlag> = (faktagrunnlag) => {
  return (props) => {
    const verdi =
      faktagrunnlag.find((x) => x.tekniskNavn === props.value.tekniskNavn)?.verdi ?? `<${props.value.visningsnavn}>`;

    return <span>{verdi}</span>;
  };
};

const ValgComponent: (brevdata: BrevdataType) => PortableTextTypeComponent<ValgRef> = (brevdata) => {
  return (props) => {
    const valgData = brevdata.valg.find((valg) => valg.id === props.value.valg._id);
    const alternativ = props.value.valg.alternativer.find((alternativ) => alternativ._key === valgData?.key);
    switch (alternativ?._type) {
      case 'kategorisertTekstRef':
        return <Teksteditor tekst={alternativ.tekst} faktagrunnlag={brevdata.faktagrunnlag} />;
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
      return <Teksteditor tekst={props.value.tekst} faktagrunnlag={brevdata.faktagrunnlag} />;
    }
    return null;
  };
};

const PeriodetekstComponent: (brevdata: BrevdataType) => PortableTextTypeComponent<PeriodetekstType> = (brevdata) => {
  return (props) => {
    const periodetekster = brevdata.periodetekster.filter(
      (periodetekst) => periodetekst.id === props.value.periodetekst._id
    );

    if (periodetekster.length) {
      return periodetekster.map((periodetekst) => (
        <Teksteditor tekst={props.value.periodetekst} faktagrunnlag={periodetekst.faktagrunnlag} />
      ));
    }

    return null;
  };
};
