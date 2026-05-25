import i18nInit from '@pseinfo/i18n/config/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


void i18n
  .use( initReactI18next )
  .init( i18nInit.init );

export default i18n;
