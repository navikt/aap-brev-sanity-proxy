import { describe, expect, it } from 'vitest';
import { parseVerdiLine } from './Brev';

describe('parseVerdiLine', () => {
  it('parses a line with single-digit start day', () => {
    const result = parseVerdiLine('8. mai 2026 - 20. mai 2026: SVANGERSKAPSPENGER 30%');
    expect(result).toEqual({
      startDay: '8',
      startMonthYear: 'mai 2026',
      endDay: '20',
      endMonthYear: 'mai 2026',
      label: 'SVANGERSKAPSPENGER',
      percentage: '30%',
    });
  });

  it('parses a line with single-digit end day', () => {
    const result = parseVerdiLine('1. mai 2026 - 7. mai 2026: AAP 70%');
    expect(result).toEqual({
      startDay: '1',
      startMonthYear: 'mai 2026',
      endDay: '7',
      endMonthYear: 'mai 2026',
      label: 'AAP',
      percentage: '70%',
    });
  });

  it('parses a line with double-digit start and end days', () => {
    const result = parseVerdiLine('10. mai 2026 - 31. mai 2026: SYKEPENGER 100%');
    expect(result).toEqual({
      startDay: '10',
      startMonthYear: 'mai 2026',
      endDay: '31',
      endMonthYear: 'mai 2026',
      label: 'SYKEPENGER',
      percentage: '100%',
    });
  });

  it('parses a line spanning different months', () => {
    const result = parseVerdiLine('25. mars 2026 - 3. april 2026: AAP 50%');
    expect(result).toEqual({
      startDay: '25',
      startMonthYear: 'mars 2026',
      endDay: '3',
      endMonthYear: 'april 2026',
      label: 'AAP',
      percentage: '50%',
    });
  });

  it('parses a line with a decimal percentage', () => {
    const result = parseVerdiLine('1. januar 2026 - 31. januar 2026: SYKEPENGER 66,7%');
    expect(result).toEqual({
      startDay: '1',
      startMonthYear: 'januar 2026',
      endDay: '31',
      endMonthYear: 'januar 2026',
      label: 'SYKEPENGER',
      percentage: '66,7%',
    });
  });

  it('returns null for a plain text line', () => {
    expect(parseVerdiLine('Dette er en vanlig tekstlinje')).toBeNull();
  });

  it('returns null for a line missing the percentage', () => {
    expect(parseVerdiLine('8. mai 2026 - 20. mai 2026: SVANGERSKAPSPENGER')).toEqual({
      startDay: '8',
      startMonthYear: 'mai 2026',
      endDay: '20',
      endMonthYear: 'mai 2026',
      label: 'SVANGERSKAPSPENGER',
      percentage: undefined,
    });
  });

  it('returns null for an empty string', () => {
    expect(parseVerdiLine('')).toBeNull();
  });
});
