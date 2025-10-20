import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { PortableText, PortableTextBlock } from '@portabletext/react';

interface PortableTextToHtmlProps {
  brevmodell: PortableTextBlock;
}

const PortableTextToHtml = ({ brevmodell }: PortableTextToHtmlProps) => {
  return <PortableText value={brevmodell} />;
};

export const portableTextToHtml = (brevmodell: PortableTextBlock) =>
  renderToStaticMarkup(<PortableTextToHtml brevmodell={brevmodell} />);
