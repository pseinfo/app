import type { AppContextValue } from '@/types/context/app';
import { createContext } from 'react';


export const AppContext = createContext < AppContextValue | null > ( null );
