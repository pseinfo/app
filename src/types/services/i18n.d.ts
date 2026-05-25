import type { resources } from '@pseinfo/i18n/config/app';
import 'i18next';


declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'app.generic';
    resources: typeof resources.en;
    enableSelector: true;
  }
}
