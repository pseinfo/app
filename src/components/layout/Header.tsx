import { TextAlignEnd } from 'lucide-react';
import type { JSX } from 'react';

import Atom from '/assets/media/atom.svg?url';


export const Header = () : JSX.Element => {
  return (
    <header
      id= 'header'
      role= 'banner'
      aria-label= 'Header'
      className= {
        'fixed top-0 z-99 flex flex-row justify-between items-center gap-12 w-full ' +
        'h-16 px-4 bg-white shadow-sm shadow-slate-200 select-none'
      }
    >
      <div
        className= 'flex flex-row items-center gap-4'
      >
        <button
          role= 'button'
          aria-label= 'Open Menu'
          className= {
            'flex flex-row items-center gap-3 h-10 px-3 ' +
            'bg-transparent hover:bg-slate-100'
          }
        >
          <TextAlignEnd
            size= { 20 }
          />
          <span
            className= 'font-medium'
          >
            Explore
          </span>
        </button>

        <div
          className= 'w-px h-8 bg-slate-400/50'
        />

        <h1
          role= 'heading'
          aria-label= 'Page Title'
          className= 'flex flex-row items-center gap-3 px-4'
        >
          <img
            src= { Atom }
            role= 'img'
            aria-label= 'Logo'
            className= 'w-10 h-10'
          />
          <span
            className= 'font-bold'
          >
            Periodic Table of Elements
          </span>
        </h1>
      </div>
    </header>
  );
};
