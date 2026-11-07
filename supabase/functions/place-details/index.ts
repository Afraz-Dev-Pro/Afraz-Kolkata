// Google Place Details proxy. Client-supplied Place IDs are untrusted input.
const allowedOrigin = Deno.env.get('APP_ALLOWED_ORIGIN') ?? '*';

Deno.serve(async (request: Request) => {
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };
  if (request.method === 'OPTIONS') return new Response('ok', { headers });
  if (request.method !== 'POST') return Response.json({ error: 'method_not_allowed' }, { status: 405, headers });

  const key = Deno.env.get('GOOGLE_PLACES_API_KEY');
  if (!key) return Response.json({ error: 'places_unavailable' }, { status: 503, headers });
  let body: { placeId?: unknown };
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid_json' }, { status: 400, headers }); }
  if (typeof body.placeId !== 'string' || !/^[A-Za-z0-9_-]{8,200}$/.test(body.placeId)) {
    return Response.json({ error: 'invalid_place_id' }, { status: 400, headers });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(body.placeId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,primaryTypeDisplayName,rating,userRatingCount,googleMapsUri,attributions',
      },
      signal: controller.signal,
    });
    if (!response.ok) return Response.json({ error: response.status === 404 ? 'place_not_found' : 'places_provider_error' }, { status: response.status === 404 ? 404 : 502, headers });
    const place = await response.json();
    return Response.json({ place, source: 'Google Maps', retrievedAt: new Date().toISOString() }, { headers });
  } catch {
    return Response.json({ error: 'places_provider_unavailable' }, { status: 502, headers });
  } finally { clearTimeout(timeout); }
});
