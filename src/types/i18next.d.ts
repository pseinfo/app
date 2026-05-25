import type { AppDefaultNS, AppI18nResources } from '@pseinfo/i18n/config/app';
import 'i18next';


declare module i18next {
  interface CustomTypeOptions {
    defaultNS: AppDefaultNS;
    enableSelector: true;
    resources: AppI18nResources;
  }
}
