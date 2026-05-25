import { Container } from '@/layout/container';
import { AppProvider } from '@/provider/app';
import type { JSX } from 'react';
import type { AppProps } from '@/type/global';


export default function App ( { locale }: AppProps ) : JSX.Element {
  return (
    <AppProvider locale= { locale }>
      <Container />
    </AppProvider>
  );
}
