import React from 'react';
import { Mottaker as MottakerModell } from '../pdfModell';

interface Props {
  mottaker: MottakerModell;
  saksnummer: string;
  dato: string;
}

export const Mottaker = ({ mottaker, saksnummer, dato }: Props) => {
  switch (mottaker.identType) {
    case 'FNR':
      return (
        <div className="mottaker">
          <p>Navn: {mottaker.navn}</p>
          <p>Fødselsnummer: {mottaker.ident}</p>
          <p>Dato: {dato}</p>
          <p>Saksnummer: {saksnummer}</p>
        </div>
      );
    case 'HPRNR':
      return (
        <div className="mottaker">
          <p>Til: {mottaker.navn}</p>
          <p>HPR-nummer: {mottaker.ident}</p>
          <p>Dato: {dato}</p>
          <p>Vår referanse: {saksnummer}</p>
        </div>
      );
  }
};
