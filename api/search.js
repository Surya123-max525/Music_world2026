import { applyCors, errorDetail, methodNotAllowed } from '../backend/http.js';
import { searchSongs } from '../backend/youtube.js';

export default async function handler(request, response) {
  if (applyCors(request, response)) return;
  if (request.method !== 'GET') return methodNotAllowed(response);

  const query = String(request.query.q || '').trim();
  if (!query) return response.status(400).json({ error: 'Missing q search parameter' });

  try {
    response.status(200).json({ results: await searchSongs(query) });
  } catch (error) {
    response.status(502).json({ error: 'Search failed', detail: errorDetail(error) });
  }
}
