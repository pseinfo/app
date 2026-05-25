import { Header } from '@/c/base/header';
import type { JSX, PropsWithChildren } from 'react';


export interface ContainerProps extends PropsWithChildren {}


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
