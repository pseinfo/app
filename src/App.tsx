import { Container } from '@/layout/container';
import { AppProvider } from '@/provider/AppProvider';
import type { JSX, PropsWithChildren } from 'react';


export interface AppProps extends PropsWithChildren {
  locale: string;
}


export default function App ( { locale, children }: AppProps ) : JSX.Element {
  return (
    <AppProvider locale= { locale }>
      <Container children= { children } />
    </AppProvider>
  );
}
