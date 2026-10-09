import React from 'react';

import { Signatur as SignaturModell } from '../pdfModell';

interface Props {
  signaturer: SignaturModell[];
}
const KOLONNER = 2;

export const Signatur = ({ signaturer }: Props) => {
  if (!signaturer || signaturer.length === 0) {
    return null;
  }
  const rader: SignaturModell[][] = [];
  for (let i = 0; i < signaturer.length; i += KOLONNER) {
    rader.push(signaturer.slice(i, i + KOLONNER));
  }

  return (
    <div className="signatur-wrapper avoid-page-break">
      <p>Med vennlig hilsen</p>
      <table className="signaturer" role="presentation">
        <tbody>
          {rader.map((rad, radIndeks) => (
            <tr key={radIndeks}>
              {rad.map((signatur, indeks) => (
                <td className="signatur" key={indeks}>
                  <p>{signatur.navn}</p>
                  <p>{signatur.enhet}</p>
                </td>
              ))}
              {rad.length < KOLONNER && <td className="signatur" />}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
