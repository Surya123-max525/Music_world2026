import { applyCors, errorDetail, methodNotAllowed } from '../../backend/http.js';
import { createAudioStream } from '../../backend/youtube.js';

export default async function handler(request, response) {
  if (applyCors(request, response)) return;
  if (request.method !== 'GET') return methodNotAllowed(response);

  try {
    const stream = await createAudioStream(String(request.query.id || ''));
    response.setHeader('Content-Type', stream.type || 'audio/webm');
    response.setHeader('Cache-Control', 'no-store');
    stream.stream.pipe(response);
  } catch (error) {
    response.status(502).json({ error: 'Unable to create stream', detail: errorDetail(error) });
  }
}
