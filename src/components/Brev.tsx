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
  },
});

interface ParsedVerdiLine {
  startDay: string;
  startMonth: string;
  startYear: string;
  endDay: string;
  endMonth: string;
  endYear: string;
  label: string;
  percentage?: string;
}

const VERDI_LINE_PATTERN =
  /^(\d{1,2})\. (\w+) (\d{4}) - (\d{1,2})\. (\w+) (\d{4}): (.+?)(?:\s+(\d+(?:[,.]\d+)?%))?$/;

export function parseVerdiLine(line: string): ParsedVerdiLine | null {
  const match = line.match(VERDI_LINE_PATTERN);
  if (!match) return null;
  return {
    startDay: match[1],
    startMonth: match[2],
    startYear: match[3],
    endDay: match[4],
    endMonth: match[5],
    endYear: match[6],
    label: match[7],
    percentage: match[8],
  };
}

const verdiTableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
};

const tdStyle: React.CSSProperties = {
  padding: '0 2px',
  verticalAlign: 'top',
};

const VerdiTable = ({ rows }: { rows: ParsedVerdiLine[] }) => {
  const hasPercentage = rows.some((row) => row.percentage !== undefined);
  return (
    <table style={verdiTableStyle}>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>{row.startDay}.</td>
            <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{row.startMonth}</td>
            <td style={{ ...tdStyle, whiteSpace: 'nowrap', paddingRight: '6px' }}>{row.startYear}</td>
            <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>–</td>
            <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap', paddingLeft: '6px' }}>{row.endDay}.</td>
            <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{row.endMonth}</td>
            <td style={{ ...tdStyle, whiteSpace: 'nowrap', paddingRight: '8px' }}>{row.endYear}:</td>
            <td style={{ ...tdStyle }}>{row.label}</td>
            {hasPercentage && (
              <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap', paddingLeft: '8px' }}>
                {row.percentage ?? ''}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function FaktagrunnlagComponent(
  faktagrunnlag: { tekniskNavn: string; verdi: string }[]
): PortableTextTypeComponent<PortableTextFaktagrunnlag> {
  return (props) => {
    const verdi =
      faktagrunnlag.find((x) => x.tekniskNavn === props.value.tekniskNavn)?.verdi ?? `<${props.value.visningsnavn}>`;

    const lines = verdi.split('\n');
    const parsedLines = lines.map(parseVerdiLine);

    if (lines.length > 1 && parsedLines.every((parsed) => parsed !== null)) {
      return <VerdiTable rows={parsedLines as ParsedVerdiLine[]} />;
    }

    return (
      <>
        {lines.map((line, index) => (
          <>
            {line}
            {lines.length - 1 !== index && <br />}
          </>
        ))}
      </>
    );
  };
}

function ValgComponent(brevdata: BrevdataType): PortableTextTypeComponent<ValgRef> {
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
      return <Teksteditor tekst={props.value.tekst} faktagrunnlag={brevdata.faktagrunnlag} />;
    }
    return null;
  };
}
