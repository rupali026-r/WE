import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import hiTranslations from './translations/hi.json';
import frTranslations from './translations/fr.json';
import zhTranslations from './translations/zh.json';
import arTranslations from './translations/ar.json';
import ruTranslations from './translations/ru.json';
import deTranslations from './translations/de.json';
import jaTranslations from './translations/ja.json';
import ptTranslations from './translations/pt.json';
import itTranslations from './translations/it.json';
import bnTranslations from './translations/bn.json';
import trTranslations from './translations/tr.json';
import teTranslations from './translations/te.json';
import mrTranslations from './translations/mr.json';
import taTranslations from './translations/ta.json';
import knTranslations from './translations/kn.json';
import mlTranslations from './translations/ml.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      hi: { translation: hiTranslations },
      fr: { translation: frTranslations },
      zh: { translation: zhTranslations },
      ar: { translation: arTranslations },
      ru: { translation: ruTranslations },
      de: { translation: deTranslations },
      ja: { translation: jaTranslations },
      pt: { translation: ptTranslations },
      it: { translation: itTranslations },
      bn: { translation: bnTranslations },
      tr: { translation: trTranslations },
      te: { translation: teTranslations },
      mr: { translation: mrTranslations },
      ta: { translation: taTranslations },
      kn: { translation: knTranslations },
      ml: { translation: mlTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 