import type { JSX } from 'react';

import { HeaderLogo } from '@/layout/header/logo';


export const Header = (): JSX.Element => {
  return (
    <>
      <header
        id= 'header'
        role= 'banner'
        aria-label= 'Header'
        className= {
          'fixed top-0 left-0 z-50 w-full h-16 bg-white shadow-sm ' +
          'shadow-slate-300/50 select-none'
        }
      >
        <div
          className= 'flex justify-between items-center gap-4 h-full px-3 sm:px-4'
        >
          { /** LEFT SIDE */ }
          <div
            className= 'flex items-center min-w-0'
          >
            <HeaderLogo />
          </div>
        </div>
      </header>
    </>
  );
};
