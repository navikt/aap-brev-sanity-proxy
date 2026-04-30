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
  PortableTextFaktagrunnlag,
  PortableTextTabell,
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
  tabell: { tekniskNavn: string; rader: { celler: { kolonne: string; verdi: string }[] }[] }[];
}

const Teksteditor = (props: TeksteditorProps) => {
  return (
    <PortableText
      value={props.tekst.teksteditor}
      components={{ types: { faktagrunnlag: FaktagrunnlagComponent(props.faktagrunnlag), tabell: TabellerComponent(props.tabell) } }}
    />
  );
};

const brevmalPortableTextReactComponents = (
  delmalId: string,
  brevdata: BrevdataType
): Partial<PortableTextReactComponents> => ({
  types: {
    faktagrunnlag: FaktagrunnlagComponent(brevdata.faktagrunnlag),
    tabell: TabellerComponent(brevdata.tabeller),
    valgRef: ValgComponent(brevdata),
    fritekst: FritekstComponent(delmalId, brevdata),
    betingetTekstRef: BetingetTekstComponent(brevdata),
  },
});

function FaktagrunnlagComponent(
  faktagrunnlag: { tekniskNavn: string; verdi: string }[]
): PortableTextTypeComponent<PortableTextFaktagrunnlag> {
  return (props) => {
    const verdi =
      faktagrunnlag.find((x) => x.tekniskNavn === props.value.tekniskNavn)?.verdi ?? `<${props.value.visningsnavn}>`;

    const out = verdi.split('\n');
    return (
      <>
        {out.map((line, index) => (
          <>
            {line}
            {out.length - 1 !== index && <br />}
          </>
        ))}
      </>
    );
  };
}

function TabellerComponent(
  tabeller: BrevdataType['tabeller']
): PortableTextTypeComponent<PortableTextTabell> {
  // This is a "factory function" — it returns a React component (a function that returns JSX).
  // The pattern is used here instead of a plain component because we need to close over `tabeller`
  // (the runtime data) while PortableText controls how the component is called with `props`.
  //
  // `props.value` is the tabell block from the Sanity template. It carries:
  //   - tekniskNavn: identifies which table in the runtime data to use
  //   - kolonner:    the ordered column definitions with human-readable overskrift headings
  //
  // `tabeller` is the runtime data from the backend (brevdata.tabeller), each entry carrying
  // rows with cells keyed by their own tekniskNavn.
  return (props) => {
    // Find the matching table in the runtime data by its technical name.
    // Using the optional chaining (?.) keeps this safe if tabeller is empty.
    const tabell = tabeller?.find((t) => t.tekniskNavn === props.value.tekniskNavn);

    // Render nothing if there is no data or no rows — avoids empty tables in the letter.
    if (!tabell || tabell.rader.length === 0) return null;

    // Column order and headings come from the Sanity template, not from the data.
    // This lets editors control presentation without touching the backend.
    const kolonner = props.value.kolonner;

    return (
      <table>
        <thead>
          <tr>
            {kolonner.map((kolonne) => (
              <th key={kolonne.tekniskNavn}>{kolonne.overskrift}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabell.rader.map((rad, radIndex) => (
            <tr key={radIndex}>
              {kolonner.map((kolonne) => {
                const verdi = rad.celler.find((c) => c.kolonne === kolonne.tekniskNavn)?.verdi ?? '';
                return <td key={kolonne.tekniskNavn}>{verdi}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}

function ValgComponent(brevdata: BrevdataType): PortableTextTypeComponent<ValgRef> {
  return (props) => {
    const valgData = brevdata.valg.find((valg) => valg.id === props.value.valg._id);
    const alternativ = props.value.valg.alternativer.find((alternativ) => alternativ._key === valgData?.key);
    switch (alternativ?._type) {
      case 'kategorisertTekstRef':
        return <Teksteditor tekst={alternativ.tekst} faktagrunnlag={brevdata.faktagrunnlag} tabell={brevdata.tabeller} />;
      case 'fritekst': {
        const fritekst = brevdata.fritekster.find(
          (fritekst) => fritekst.parentId === props.value.valg._id && alternativ._key === fritekst.key
        )?.fritekst;
        if (fritekst) {
          return <span>{fritekst.tekst}</span>;
        }
        return null;
      }
      default:
        return null;
    }
  };
}

function FritekstComponent(delmalId: string, brevdata: BrevdataType): PortableTextTypeComponent<FritekstType> {
  return (props) => {
    const fritekst = brevdata.fritekster.find(
      (fritekst) => fritekst.parentId === delmalId && fritekst.key === props.value._key
    )?.fritekst;
    if (fritekst) {
      return <span>{fritekst.tekst}</span>;
    }
    return null;
  };
}

function BetingetTekstComponent(brevdata: BrevdataType): PortableTextTypeComponent<BetingetTekstType> {
  return (props) => {
    if (brevdata.betingetTekst.find((betingetTekst) => betingetTekst.id === props.value.tekst._id)) {
      return <Teksteditor tekst={props.value.tekst} faktagrunnlag={brevdata.faktagrunnlag} tabell={brevdata.tabeller}/>;
    }
    return null;
  };
}
