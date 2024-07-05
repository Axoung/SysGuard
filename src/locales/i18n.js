// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_en from './en/home';
import translation_zh from './zh/home';

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
