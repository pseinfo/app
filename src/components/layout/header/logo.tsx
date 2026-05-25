import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import AtomPng from '/assets/media/atom.png?url';
import AtomSvg from '/assets/media/atom.svg?url';


export const HeaderLogo = () : JSX.Element => {
  const { t } = useTranslation( 'app.generic' );

  return (
    <a
      href= '/'
      role= 'link'
      aria-label= 'Home Link'
      className= 'inline-flex items-center gap-3 min-w-0 px-2 py-1.5'
    >
      <object
        type= 'image/svg+xml'
        data= { AtomSvg }
        aria-label= 'Logo'
        className= 'w-10 h-10 pointer-events-none'
      >
        <img
          src= { AtomPng }
          alt= 'Logo'
          className= 'w-10 h-10'
        />
      </object>
      <div
        className= 'min-w-0 truncate font-semibold'
      >
        { t( $ => $.title ) }
      </div>
    </a>
  );
}
