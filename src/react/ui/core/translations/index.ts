import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import lang_en from './resource/en';

i18n.use(initReactI18next).init({
  resources: {
    en: lang_en,
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    nsMode: 'default',
  },
});

export default i18n;
