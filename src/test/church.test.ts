import { describe, expect, it } from 'vitest';
import { church } from '../lib/church';

describe('Church information', () => {
  it('lists Sunday service at 8:30 AM', () => expect(church.sundayService).toBe('8:30 AM'));
  it('locates the church at Achimota Mile 7 in Accra', () => expect(church.location).toBe('Achimota Mile 7, Accra, Ghana'));
  it('lists Kaspong Ltd as the venue', () => expect(church.venue).toBe('On the premises of Kaspong Ltd.'));
  it('preserves the church mission', () => expect(church.mission).toBe('Pleasing God, Serving Our Generation.'));
  it('identifies the ministry school', () => expect(church.ministry).toBe('The Father’s Heart School of Ministry'));
});