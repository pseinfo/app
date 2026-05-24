import type { JSX } from 'react';

import { BrowserRouter, Routes } from 'react-router';

export const App = () : JSX.Element => {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
};
