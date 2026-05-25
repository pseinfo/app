import type { JSX } from 'react';


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
      ></header>
    </>
  );
};
