import React from 'react';
import { Mottaker as MottakerModell } from '../pdfModell';
import { Mottaker } from './Mottaker';
import logo from '../navlogored.png';

interface Props {
  mottaker: MottakerModell;
  saksnummer: string;
  dato: string;
}

export const Header = ({ mottaker, saksnummer, dato }: Props) => {
  return (
    <div className="header">
      <img className="navLogo" alt="nav logo" src={logo} />
      <Mottaker mottaker={mottaker} saksnummer={saksnummer} dato={dato} />
    </div>
  );
};
