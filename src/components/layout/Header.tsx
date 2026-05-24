import { HeartHandshake, Search, Settings, TextAlignEnd } from 'lucide-react';
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
          className= 'w-px h-8 bg-slate-200'
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

      <div
        className= 'flex flex-row items-center gap-4'
      >
        <div
          role= 'searchbox'
          aria-label= 'Search'
          className= 'relative hidden xl:block min-w-0 h-10'
        >
          <Search
            className= 'absolute top-2.5 left-3 text-slate-400'
            size= { 20 }
          />
          <input
            name= 'query'
            placeholder= 'Search ...'
            className= 'w-full h-full pl-10 pr-4 border border-slate-200 rounded-full'
          />
        </div>

        <button
          role= 'button'
          aria-label= 'Donate'
          className= {
            'flex flex-row items-center gap-3 h-10 px-3 ' +
            'bg-transparent hover:bg-slate-100'
          }
        >
          <HeartHandshake
            size= { 20 }
          />
          <span
            className= 'font-medium'
          >
            Donate
          </span>
        </button>

        <div
          className= 'hidden xl:block w-px h-8 bg-slate-200'
        />

        <button
          role= 'button'
          aria-label= 'Search'
          className= {
            'flex xl:hidden flex-row justify-center items-center gap-3 w-10 h-10 ' +
            'bg-transparent hover:bg-slate-100'
          }
        >
          <Search
            size= { 20 }
          />
        </button>

        <button
          role= 'button'
          aria-label= 'Settings'
          className= {
            'flex flex-row justify-center items-center gap-3 w-10 h-10 ' +
            'bg-transparent hover:bg-slate-100'
          }
        >
          <Settings
            size= { 20 }
          />
        </button>
      </div>
    </header>
  );
};
