import { applyCors, errorDetail, methodNotAllowed } from '../backend/http.js';
import { suggestedSongs } from '../backend/youtube.js';

export default async function handler(request, response) {
  if (applyCors(request, response)) return;
  if (request.method !== 'GET') return methodNotAllowed(response);

  try {
    const mood = String(request.query.mood || 'chill');
    const language = String(request.query.language || 'multi language');
    response.status(200).json({ results: await suggestedSongs({ mood, language }) });
  } catch (error) {
    response.status(502).json({ error: 'Suggestions lookup failed', detail: errorDetail(error) });
  }
}
