import type { countryCodeSchema, languageCodeSchema } from '@schemas/i18n';
import type { z } from 'zod';

export type LanguageName = 'English' | 'Spanish' | 'Catalan';
export type LanguageCode = z.infer<typeof languageCodeSchema>;
export type CountryName = 'Spain' | 'United Kingdom';
export type CountryCode = z.infer<typeof countryCodeSchema>;

export interface InternationalizationData<TCode extends string, TLabel extends string> {
  code: TCode;
  label: TLabel;
  image: string;
}

export type LanguageData = InternationalizationData<LanguageCode, LanguageName>;

type CountryPhoneDetails = {
  dialCode: string;
  numberMask: RegExp;
};

export interface PhoneData extends InternationalizationData<CountryCode, CountryName> {
  phoneDetails: CountryPhoneDetails;
}
