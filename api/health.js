import { applyCors, methodNotAllowed } from '../backend/http.js';

export default async function handler(request, response) {
  if (applyCors(request, response)) return;
  if (request.method !== 'GET') return methodNotAllowed(response);

  response.status(200).json({ ok: true, service: 'masti-music-api', runtime: 'vercel' });
}
