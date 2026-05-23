import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const app = createRoot( document.getElementById( 'app' )! );
app.render( <StrictMode></StrictMode> );
