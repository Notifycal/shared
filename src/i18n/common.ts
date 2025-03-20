import flagEn from '@assets/en.png';
import flagEs from '@assets/es.png';
import type { CountryCode, LanguageCode, LanguageData, PhoneData } from '@types';

// https://en.wikipedia.org/wiki/E.164
// where it states there is a mapping of country codes to dial codes - with some exceptions
export const phoneData: Record<CountryCode, PhoneData> = {
  ES: {
    label: 'Spain',
    code: 'ES',
    image: flagEs,
    phoneDetails: { numberMask: /^(?:\+34\s?)?[67]\d{8}$/, dialCode: '+34' }
  },
  EN: {
    label: 'United Kingdom',
    code: 'EN',
    image: flagEn,
    phoneDetails: { numberMask: /^(?:\+44\s?|0)7\d{9}$/, dialCode: '+44' }
  }
};

export const countryDialCodeMatrix: Record<CountryCode, string> = Object.fromEntries(
  Object.entries(phoneData).map(([key, value]) => [key as CountryCode, value.phoneDetails.dialCode])
) as Record<CountryCode, string>;

export const languageData: Record<LanguageCode, LanguageData> = {
  es: { label: 'Spanish', code: 'es', image: flagEs },
  en: { label: 'English', code: 'en', image: flagEn }
};
