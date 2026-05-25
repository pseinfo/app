import type { JSX } from 'react';

import { Header } from '@/layout/header';
import { Footer } from '@/layout/footer';


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
