import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import '@/styles.css';

const app = createRoot( document.getElementById( 'app' )! );
app.render( <StrictMode> <App /> </StrictMode> );
