/// <reference types="vitest/config" />
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * Makes `vite preview` behave like a typical static host: /about serves about.html, and
 * unknown paths get dist/404.html with a real 404 status instead of the SPA fallback.
 * (The dev server keeps its normal SPA fallback.)
 */
function staticHostPreview(): Plugin {
  return {
    name: 'static-host-preview',
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const pathname = decodeURIComponent(url.pathname);
        if (req.method !== 'GET' || pathname === '/') return next();
        if (path.extname(pathname)) {
          const file = path.join(outDir, pathname);
          if (file.startsWith(outDir) && existsSync(file)) return next();
        } else {
          const clean = pathname.replace(/\/+$/, '');
          const page = path.join(outDir, `${clean}.html`);
          if (page.startsWith(outDir) && existsSync(page)) {
            if (clean === pathname) return next();
            res.statusCode = 301; // canonical URLs have no trailing slash
            res.setHeader('Location', clean + url.search);
            return res.end();
          }
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(readFileSync(path.join(outDir, '404.html')));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticHostPreview()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
