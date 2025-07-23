import { z } from 'zod';

export const countryCodeSchema = z.enum(['ES', 'GB']).describe('ISO 3166-1 alpha-2 country code');

export const languageCodeSchema = z.enum(['es', 'en', 'ca'] as const).describe('ISO 639-1 language code');
