import type { AppContextValue } from '@/type/context/AppContext';
import { createContext } from 'react';


export const AppContext = createContext < AppContextValue | null > ( null );
