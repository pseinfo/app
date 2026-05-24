import type { JSX } from 'react';

import type { MainLayoutProps } from '@/types/props';

export const MainLayout = ( { children }: MainLayoutProps ) : JSX.Element => {
  return (
    <div id= 'wrapper' role= 'application'>
      <main id= 'main' role= 'main' aria-label= 'Content'>
        { children }
      </main>
    </div>
  );
};
