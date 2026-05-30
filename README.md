# Masti Music

Masti Music is a premium, mobile-first, futuristic AI music streaming app built with React, TypeScript, Vite, TailwindCSS, Framer Motion, a custom Express backend, YouTube search/stream integration, Supabase sync, and installable PWA support.

## Features

- Spotify-style home shelves, search, library, favorites, and profile tabs.
- Custom backend API routes: `/search`, `/stream/:id`, `/playlist/:id`, `/trending`, and `/suggestions`.
- Floating mini player, fullscreen gesture player, neon canvas visualizer, lyrics sheet, and queue cards.
- Supabase client setup and SQL schema for users, playlists, favorites, recently played, spaces, and playlist tracks.
- Android/iPhone friendly PWA manifest and service worker offline app shell.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
npm run backend
```

Add your Supabase anon key to `.env` before using auth or cloud sync.
