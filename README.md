# Masti Music

Masti Music is a premium, mobile-first, futuristic AI music streaming app built with React, TypeScript, Vite, TailwindCSS, Framer Motion, a custom Express backend, YouTube search/stream integration, Supabase sync, and installable PWA support.

## Features

- Spotify-style home shelves, search, library, favorites, and profile tabs.
- Custom backend API routes: `/search`, `/stream/:id`, `/playlist/:id`, `/trending`, and `/suggestions`.
- Floating mini player, fullscreen gesture player, neon canvas visualizer, lyrics sheet, and queue cards.
- Supabase client setup and SQL schema for users, playlists, favorites, recently played, spaces, and playlist tracks.
- Android/iPhone friendly PWA manifest and service worker offline app shell.
- GitHub Pages workflow for automatic frontend deployment from `main` or `master`.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
npm run backend
```

Add your Supabase anon key to `.env` before using auth or cloud sync.

## Deploy the frontend on GitHub Pages

This repository includes `.github/workflows/deploy-frontend.yml`, which builds the Vite app and publishes the `dist` folder with GitHub Pages.

1. Push this repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Add repository variables in **Settings → Secrets and variables → Actions → Variables**:
   - `VITE_SUPABASE_URL` — defaults to `https://zikcoyvmlfmzeaandpjb.supabase.co` if omitted.
   - `VITE_API_BASE_URL` — your deployed backend URL, for example a Render or Vercel Node API URL.
5. Add repository secret in **Settings → Secrets and variables → Actions → Secrets**:
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon key.
6. Push to `main` or `master`, or run **Deploy frontend to GitHub Pages** manually from the **Actions** tab.

The Vite `base` path is automatically set from `GITHUB_REPOSITORY`, so project pages such as `https://username.github.io/Music_world2026/` load static assets, the manifest, and the service worker correctly.

> GitHub Pages hosts static frontend files only. Keep the Express streaming backend on Render, Vercel, or another Node-compatible host, then point `VITE_API_BASE_URL` to that backend.
