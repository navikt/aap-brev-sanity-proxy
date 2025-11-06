import React from 'react';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { style } from './style';
import { Mottaker as MottakerModell, Signatur as SignaturModell } from '../pdfModell';
import { Header } from './Header';
import { Signatur } from './Signatur';

interface Props {
  overskrift: string;
  mottaker: MottakerModell;
  saksnummer: string;
  brevmal: PortableTextBlock;
  dato: string;
  signaturer: SignaturModell[];
}

export const Brev = (props: Props) => {
  return (
    <html lang="nb-NO">
      <head>
        <meta charSet="UTF-8" />
        <title>{props.overskrift}</title>
        <meta name="description" content={props.overskrift} />
        <meta name="subject" content={props.overskrift} />
        <meta name="author" content="NAV IT" />
        <style>{style(props.mottaker.identType === 'FNR' ? props.saksnummer : undefined)}</style>
      </head>
      <body>
        <main>
          <Header mottaker={props.mottaker} saksnummer={props.saksnummer} dato={props.dato} />
          <PortableText value={props.brevmal} />
          <Signatur signaturer={props.signaturer} />
        </main>
      </body>
    </html>
  );
};
