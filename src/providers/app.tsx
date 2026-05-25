import { AppContext } from '@/context/app';
import i18n from '@/services/i18n';
import type { AppProviderProps } from '@/types/providers/app';
import type { JSX } from 'react';
import { useCallback, useEffect, useMemo } from 'react';


export const AppProvider = ( { children, locale }: AppProviderProps ) : JSX.Element => {
  useEffect( () => { void i18n.changeLanguage( locale ) }, [ locale ] );

  const setLocale = useCallback(
    async ( nextLocale: string ) : Promise< void > => {
      await i18n.changeLanguage( nextLocale );
    },
    []
  );

  const value = useMemo(
    () => ( { locale, i18n, setLocale } ),
    [ locale, setLocale ]
  );

  return (
    <AppContext.Provider
      value= { value }
    >
      { children }
    </AppContext.Provider>
  );
};
