import i18nConfig from '@pseinfo/i18n/config/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


void await i18n
  .use( initReactI18next )
  .init( i18nConfig.i18next );

export default i18n;
