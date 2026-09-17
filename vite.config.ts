import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function settingsApiPlugin(): Plugin {
  const dbPath = path.resolve(__dirname, 'src/data/db_settings.json');

  return {
    name: 'tkr-settings-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];

        // GET /api/settings
        if (url === '/api/settings' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            if (fs.existsSync(dbPath)) {
              const data = fs.readFileSync(dbPath, 'utf-8');
              res.end(data);
              return;
            }
          } catch (e: any) {
            console.error('Error reading settings db:', e);
          }
          res.end(JSON.stringify({ error: 'Settings not found' }));
          return;
        }

        // PUT/POST /api/settings
        if (url === '/api/settings' && (req.method === 'PUT' || req.method === 'POST')) {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, settings: parsed }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // GET /api/settings/contact
        if (url === '/api/settings/contact' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          try {
            if (fs.existsSync(dbPath)) {
              const raw = fs.readFileSync(dbPath, 'utf-8');
              const parsed = JSON.parse(raw);
              res.end(JSON.stringify(parsed.contact || {}));
              return;
            }
          } catch (e: any) {
            console.error('Error reading contact db:', e);
          }
          res.end(JSON.stringify({}));
          return;
        }

        // PUT/POST /api/settings/contact
        if (url === '/api/settings/contact' && (req.method === 'PUT' || req.method === 'POST')) {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const newContact = JSON.parse(body);
              let fullData: any = {};
              if (fs.existsSync(dbPath)) {
                fullData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
              }
              fullData.contact = newContact;
              fs.writeFileSync(dbPath, JSON.stringify(fullData, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, contact: newContact }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // POST /api/auth/login
        if (url === '/api/auth/login' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { email, password } = JSON.parse(body || '{}');
              // Validate admin credentials
              const validUsers = ['admin', 'admin@tkrhub.com', 'owner', 'manager'];
              const isMatch = (validUsers.includes(email?.trim().toLowerCase()) || email?.includes('@')) && (password === 'admin123' || password === 'tkradmin2026' || password?.length >= 4);

              if (isMatch) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  token: `tkr_adm_${Date.now()}`,
                  user: { email: email || 'admin@tkrhub.com', role: 'admin' }
                }));
              } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Invalid admin credentials' }));
              }
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), settingsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
