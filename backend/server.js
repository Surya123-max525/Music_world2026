import cors from 'cors';
import express from 'express';
import play from 'play-dl';
import yts from 'yt-search';

const app = express();
const port = process.env.PORT || 4000;
const youtubeUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());

const normalizeVideo = (video) => ({
  id: video.videoId,
  title: video.title,
  artist: video.author?.name || 'YouTube Music',
  thumbnail: video.thumbnail,
  duration: video.timestamp || '0:00',
});

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'masti-music-api' });
});

app.get('/search', async (request, response) => {
  const query = String(request.query.q || '').trim();
  if (!query) return response.status(400).json({ error: 'Missing q search parameter' });

  const search = await yts(`${query} song official audio`);
  response.json({ results: search.videos.slice(0, 12).map(normalizeVideo) });
});

app.get('/stream/:id', async (request, response) => {
  try {
    const stream = await play.stream(youtubeUrl(request.params.id), { quality: 2 });
    response.setHeader('Content-Type', stream.type || 'audio/webm');
    response.setHeader('Cache-Control', 'no-store');
    stream.stream.pipe(response);
  } catch (error) {
    response.status(502).json({ error: 'Unable to create stream', detail: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.get('/playlist/:id', async (request, response) => {
  response.json({ id: request.params.id, name: 'Imported YouTube Playlist', tracks: [] });
});

app.get('/trending', async (_request, response) => {
  const search = await yts('trending music India global official audio');
  response.json({ results: search.videos.slice(0, 12).map(normalizeVideo) });
});

app.get('/suggestions', async (request, response) => {
  const mood = String(request.query.mood || 'chill');
  const language = String(request.query.language || 'multi language');
  const search = await yts(`${mood} ${language} music mix`);
  response.json({ results: search.videos.slice(0, 12).map(normalizeVideo) });
});

app.listen(port, () => {
  console.log(`Masti Music API listening on :${port}`);
});
