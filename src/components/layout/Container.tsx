import type { JSX } from 'react';

import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';


export const Container = () : JSX.Element => {
  return (
    <div
      id= 'wrapper'
      role= 'document'
    >
      <Header />

      <main
        id= 'content'
        role= 'main'
        aria-label= 'Content'
      />

      <Footer />
    </div>
  );
};
