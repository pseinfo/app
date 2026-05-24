import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { MainLayout } from '@/layout/MainLayout';
import { PeriodicTableView } from '@/views/PeriodicTable';

export const App = () : JSX.Element => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            element= { <PeriodicTableView /> }
            path= '/'
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
