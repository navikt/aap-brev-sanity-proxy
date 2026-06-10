import { describe, expect, it } from 'vitest';
import { stripEmptyPortableTextBlocks } from './portableTextUtils';

describe('stripEmptyPortableTextBlocks', () => {
  it('removes empty PortableText blocks', () => {
    const value = [
      { _type: 'block', children: [] },
      { _type: 'block', children: [{ _type: 'span', text: '   ' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Ferdig' }] },
      { _type: 'tabell', tekniskNavn: 'tabell1' },
    ];

    expect(stripEmptyPortableTextBlocks(value)).toEqual([
      { _type: 'block', children: [{ _type: 'span', text: 'Ferdig' }] },
      { _type: 'tabell', tekniskNavn: 'tabell1' },
    ]);
  });
});
