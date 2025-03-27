import type { CountryCode, LanguageCode, LanguageData, PhoneData } from '@types';

// https://en.wikipedia.org/wiki/E.164
// where it states there is a mapping of country codes to dial codes - with some exceptions
export const phoneByCountry: Record<CountryCode, Omit<PhoneData, 'image'>> = {
  ES: {
    label: 'Spain',
    code: 'ES',
    phoneDetails: { numberMask: /^(?:\+34\s?)?[67]\d{8}$/, dialCode: '+34' }
  },
  GB: {
    label: 'United Kingdom',
    code: 'GB',
    phoneDetails: { numberMask: /^(?:\+44\s?|0)7\d{9}$/, dialCode: '+44' }
  }
};

export const languageByLanguageCode: Record<LanguageCode, Omit<LanguageData, 'image'>> = {
  es: { label: 'Spanish', code: 'es' },
  en: { label: 'English', code: 'en' }
};
