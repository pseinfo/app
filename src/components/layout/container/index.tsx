import { Header } from '@/layout/header';
import type { JSX } from 'react';


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
    </div>
  );
};
