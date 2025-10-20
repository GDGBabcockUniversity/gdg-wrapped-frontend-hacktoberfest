import { describe, it, expect } from 'vitest';
import { formatPhoneNumber } from '../src/utilities/utils';

describe('formatPhoneNumber', () => {
  it('formats Nigerian local 10-digit as +234 with 3-3-4', () => {
    expect(formatPhoneNumber('8031234567')).toBe('+234 803 123-4567');
  });

  it('formats Nigerian local 11-digit (leading 0) as +234 with 3-3-4', () => {
    expect(formatPhoneNumber('08031234567')).toBe('+234 803 123-4567');
  });

  it('formats +234 numbers preserving country code with 3-3-4 when 10 digits', () => {
    expect(formatPhoneNumber('+2348031234567')).toBe('+234 803 123-4567');
  });

  it('formats +1 US numbers with 3-3-4 pattern', () => {
    expect(formatPhoneNumber('+14155552671')).toBe('+1 415 555-2671');
  });

  it('formats +233 Ghana numbers chunked by 3s (9-digit national)', () => {
    expect(formatPhoneNumber('+233201234567')).toBe('+233 201 234 567');
  });

  it('strips spaces and hyphens before formatting', () => {
    expect(formatPhoneNumber(' +1 (415) 555-2671 ')).toBe('+1 415 555-2671');
  });
});


