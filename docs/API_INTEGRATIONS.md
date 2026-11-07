# API integration plan

## Google Places API (New)
Use Text Search/Place Details as needed from a server-side Edge Function. Require explicit field masks and request only fields needed for each screen. Keep the API key in server secrets, restrict it to required APIs, debounce search, and load detail/photo only on demand. Preserve Google attribution and content display rules. Never scrape Maps pages or persist photo references/content outside permitted policy.

## Google Maps URLs
Use `https://www.google.com/maps/dir/?api=1&destination=...`; include `destination_place_id` when present. URLs require `api=1` and do not require an API key. Open through the operating system/browser.

## Routes API
Future server adapter requests routes only after user action; normalize results and label provider/freshness. Transit coverage and availability vary; absence must be explained. Never synthesize bus stops or fares.

## Supabase
Client uses publishable/anon key plus Auth. Privileged service key and Google key stay in Edge Function secrets. Apply caller JWT/RLS and server-side authorization for writes and admin tools.

Configure `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` for the app. Set `GOOGLE_PLACES_API_KEY` as a Supabase Edge Function secret. `GOOGLE_ROUTES_API_KEY` is reserved for the later Routes adapter and is not read by the current app.

## Failure behavior
Structured unavailable/invalid/permission/rate-limit/provider errors; bounded retries only for transient errors. Curated app-owned content and Maps URL action remain usable if Google enrichment is absent.
