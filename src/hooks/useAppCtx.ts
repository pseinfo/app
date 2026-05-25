import { AppContext } from '@/context/app';
import type { AppContextValue } from '@/types/context/app';
import { useContext } from 'react';


export const useAppCtx = () : AppContextValue => {
  const ctx = useContext( AppContext );

  if ( ! ctx ) throw new Error( 'useAppCtx must be used inside AppProvider' );
  return ctx;
};
