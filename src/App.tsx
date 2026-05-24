import type { JSX } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';

import { PeriodicTableView } from '@/views/PeriodicTable';

export const App = () : JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element= { <PeriodicTableView /> }
          path= '/'
        />
      </Routes>
    </BrowserRouter>
  );
};
