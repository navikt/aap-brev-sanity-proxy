import { describe, expect, it } from 'vitest';
import { parseVerdiLine } from './Brev';

describe('parseVerdiLine', () => {
  it('parses a line with single-digit start day', () => {
    const result = parseVerdiLine('8. mai 2026 - 20. mai 2026: SVANGERSKAPSPENGER 30%');
    expect(result).toEqual({
      startDay: '8',
      startMonth: 'mai',
      startYear: '2026',
      endDay: '20',
      endMonth: 'mai',
      endYear: '2026',
      label: 'SVANGERSKAPSPENGER',
      percentage: '30%',
    });
  });

  it('parses a line with single-digit end day', () => {
    const result = parseVerdiLine('1. mai 2026 - 7. mai 2026: AAP 70%');
    expect(result).toEqual({
      startDay: '1',
      startMonth: 'mai',
      startYear: '2026',
      endDay: '7',
      endMonth: 'mai',
      endYear: '2026',
      label: 'AAP',
      percentage: '70%',
    });
  });

  it('parses a line with double-digit start and end days', () => {
    const result = parseVerdiLine('10. mai 2026 - 31. mai 2026: SYKEPENGER 100%');
    expect(result).toEqual({
      startDay: '10',
      startMonth: 'mai',
      startYear: '2026',
      endDay: '31',
      endMonth: 'mai',
      endYear: '2026',
      label: 'SYKEPENGER',
      percentage: '100%',
    });
  });

  it('parses a line spanning different months', () => {
    const result = parseVerdiLine('25. mars 2026 - 3. april 2026: AAP 50%');
    expect(result).toEqual({
      startDay: '25',
      startMonth: 'mars',
      startYear: '2026',
      endDay: '3',
      endMonth: 'april',
      endYear: '2026',
      label: 'AAP',
      percentage: '50%',
    });
  });

  it('parses a line with a decimal percentage', () => {
    const result = parseVerdiLine('1. januar 2026 - 31. januar 2026: SYKEPENGER 66,7%');
    expect(result).toEqual({
      startDay: '1',
      startMonth: 'januar',
      startYear: '2026',
      endDay: '31',
      endMonth: 'januar',
      endYear: '2026',
      label: 'SYKEPENGER',
      percentage: '66,7%',
    });
  });

  it('parses a line with a long month name (september)', () => {
    const result = parseVerdiLine('1. september 2026 - 30. november 2026: AAP 50%');
    expect(result).toEqual({
      startDay: '1',
      startMonth: 'september',
      startYear: '2026',
      endDay: '30',
      endMonth: 'november',
      endYear: '2026',
      label: 'AAP',
      percentage: '50%',
    });
  });

  it('returns null for a plain text line', () => {
    expect(parseVerdiLine('Dette er en vanlig tekstlinje')).toBeNull();
  });

  it('parses a line without a trailing percentage', () => {
    expect(parseVerdiLine('8. mai 2026 - 20. mai 2026: SVANGERSKAPSPENGER')).toEqual({
      startDay: '8',
      startMonth: 'mai',
      startYear: '2026',
      endDay: '20',
      endMonth: 'mai',
      endYear: '2026',
      label: 'SVANGERSKAPSPENGER',
      percentage: undefined,
    });
  });

  it('returns null for an empty string', () => {
    expect(parseVerdiLine('')).toBeNull();
  });
});
