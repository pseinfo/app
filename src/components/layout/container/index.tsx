import { Header } from '@/layout/header';
import type { ContainerProps } from '@/type/components/layout/container';
import type { JSX } from 'react';


export const Container = ( { children }: ContainerProps ) : JSX.Element => {
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
        className= 'min-h-dvh p-8'
      >
        { children }
      </main>
    </div>
  );
};
