import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    
    },
    // ns:['common', 'common2'],////pages name
    // react: { useSuspense: false },
    backend: {
      // loadPath: '/locales/{{lng}}/common.json',
      // loadPath: '/locales/{{lng}}/{{ns}}.json',//dynamic hein h 


    },
  })


export default i18n;
