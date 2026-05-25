import type i18n from '@/services/i18n';


export interface AppContextValue {
  locale: string | undefined;
  i18n: typeof i18n;
  setLocale: ( nextLocale: string ) => Promise< void >;
}
