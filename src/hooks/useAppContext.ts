import { AppContext, type AppContextValue } from '@/context/AppContext';
import { useContext } from 'react';


export const useAppContext = () : AppContextValue => {
  const ctx = useContext( AppContext );

  if ( ! ctx ) throw new Error(
    'useAppContext must be used inside <AppProvider />'
  );

  return ctx;
};
