import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import { basePath } from './config/site';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <BrowserRouter basename={basePath || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are prerendered at build time, so hydrate them; the dev server
// serves an empty shell, so render from scratch there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
