import '@/asset/styles/tailwind.css';
import { Container } from '@/c/base/container';
import { AppProvider } from '@/provider/AppProvider';
import '@/service/I18nService';
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
