export function applyCors(request, response) {
  const requestOrigin = request.headers.origin;
  const configuredOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((origin) => origin.trim());
  const allowedOrigin = configuredOrigins.includes('*') || !requestOrigin
    ? '*'
    : configuredOrigins.includes(requestOrigin)
      ? requestOrigin
      : configuredOrigins[0];

  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return true;
  }

  return false;
}

export function methodNotAllowed(response) {
  response.setHeader('Allow', 'GET,OPTIONS');
  response.status(405).json({ error: 'Method not allowed' });
}

export function errorDetail(error) {
  return error instanceof Error ? error.message : 'Unknown error';
}
