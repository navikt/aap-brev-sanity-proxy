import React from 'react';

import { Signatur as SignaturModell } from '../pdfModell';

interface Props {
  signaturer: SignaturModell[];
}

export const Signatur = ({ signaturer }: Props) => {
  if (!signaturer || signaturer.length === 0) {
    return null;
  }

  return (
    <div className="signatur-wrapper avoid-page-break">
      <p>Med vennlig hilsen</p>
      {signaturer.map((signatur) => (
        <div className="signatur">
          <p>{signatur.navn}</p>
          <p>{signatur.enhet}</p>
        </div>
      ))}
    </div>
  );
};
