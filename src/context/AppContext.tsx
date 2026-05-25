import type i18n from '@/service/I18nService';
import { createContext } from 'react';


export interface AppContextValue {
  locale: string | undefined;
  i18n: typeof i18n;
  setLocale: ( nextLocale: string ) => Promise< void >;
}


export const AppContext = createContext < AppContextValue | null > ( null );
