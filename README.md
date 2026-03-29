# NC Cabinet Source

Website for NC Cabinet Source — quality cabinets for kitchens, bathrooms, and outdoor spaces.

## Staging & Production

- **`staging`** — Test changes here before going live
- **`main`** — Production (merge from staging when ready)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full workflow.

## Local Preview (Development)

**Option 1 — Dev server (with hot reload):**
```bash
npm install   # if you haven't already
npm run dev
```
Then open **http://localhost:3000** in your browser.

**Option 2 — Static preview (builds first, opens browser automatically):**
```bash
npm run preview:static
```
This builds the site and opens http://localhost:3000 in your default browser.

## Production Build & Run

```bash
npm run build
npm start
```

The production server serves the built static files from `dist/public` on port 5000.

## Preview Production Build

To test the production build locally before publishing:

```bash
npm run preview
```

This builds and then serves the site at http://localhost:3000 (or set `PORT=5000` to use port 5000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with HMR (port 3000) |
| `npm run dev:client` | Vite-only dev server (no Express API) |
| `npm run build` | Build client + server for production |
| `npm run preview` | Build + run production server (test before deploy) |
| `npm run preview:static` | Build + serve static files, opens browser automatically |
| `npm start` | Run production server |
| `npm run check` | TypeScript type check |
