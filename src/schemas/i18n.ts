import { z } from 'zod';

const countryCodes = [z.literal('ES'), z.literal('EN')] as const;
export const countryCodeSchema = z.union(countryCodes).describe('ISO 3166-1 alpha-2 country code');

const languageCodes = [z.literal('es'), z.literal('en')] as const;
export const languageCodeSchema = z.union(languageCodes).describe('ISO 639-1 language code');
