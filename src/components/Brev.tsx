import React from 'react';
import { PortableText, PortableTextReactComponents, PortableTextTypeComponent } from '@portabletext/react';
import { style } from './style';
import { Mottaker as MottakerModell, Signatur as SignaturModell } from '../pdfModell';
import { Header } from './Header';
import { Signatur } from './Signatur';
import { BrevmalType, PortableTextFaktagrunnlag } from '../brevmalTyper';
import { BrevdataType, FaktagrunnlagMedVerdiType } from '../brevdataTyper';

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
            {brevmal.delmaler.map((delmalRef) => (
              <>
                <h2>{delmalRef.delmal.overskrift}</h2>
                <PortableText
                  value={delmalRef.delmal.teksteditor}
                  components={brevmalPortableTextReactComponents(brevdata)}
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

const brevmalPortableTextReactComponents = (brevdata: BrevdataType): Partial<PortableTextReactComponents> => ({
  types: {
    faktagrunnlag: FaktagrunnlagComponent(brevdata.faktagrunnlag),
  },
});

const FaktagrunnlagComponent: (
  faktagrunnlag: FaktagrunnlagMedVerdiType[]
) => PortableTextTypeComponent<PortableTextFaktagrunnlag> = (faktagrunnlag) => {
  return (props) => {
    const verdi =
      faktagrunnlag.find((x) => x.tekniskNavn === props.value.tekniskNavn)?.verdi ?? `<${props.value.visningsnavn}>`;

    return <span>{verdi}</span>;
  };
};
