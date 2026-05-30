import cors from 'cors';
import express from 'express';
import { createAudioStream, searchSongs, suggestedSongs, trendingSongs } from './youtube.js';
import { errorDetail } from './http.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'masti-music-api' });
});

app.get('/search', async (request, response) => {
  const query = String(request.query.q || '').trim();
  if (!query) return response.status(400).json({ error: 'Missing q search parameter' });

  response.json({ results: await searchSongs(query) });
});

app.get('/stream/:id', async (request, response) => {
  try {
    const stream = await createAudioStream(request.params.id);
    response.setHeader('Content-Type', stream.type || 'audio/webm');
    response.setHeader('Cache-Control', 'no-store');
    stream.stream.pipe(response);
  } catch (error) {
    response.status(502).json({ error: 'Unable to create stream', detail: errorDetail(error) });
  }
});

app.get('/playlist/:id', async (request, response) => {
  response.json({ id: request.params.id, name: 'Imported YouTube Playlist', tracks: [] });
});

app.get('/trending', async (_request, response) => {
  response.json({ results: await trendingSongs() });
});

app.get('/suggestions', async (request, response) => {
  const mood = String(request.query.mood || 'chill');
  const language = String(request.query.language || 'multi language');
  response.json({ results: await suggestedSongs({ mood, language }) });
});

app.listen(port, () => {
  console.log(`Masti Music API listening on :${port}`);
});
