import { applyCors, errorDetail, methodNotAllowed } from '../backend/http.js';
import { trendingSongs } from '../backend/youtube.js';

export default async function handler(request, response) {
  if (applyCors(request, response)) return;
  if (request.method !== 'GET') return methodNotAllowed(response);

  try {
    response.status(200).json({ results: await trendingSongs() });
  } catch (error) {
    response.status(502).json({ error: 'Trending lookup failed', detail: errorDetail(error) });
  }
}
