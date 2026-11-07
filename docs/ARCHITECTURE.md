# Architecture

## Initial deployment shape
- Expo + React Native + TypeScript + Expo Router mobile client.
- TanStack Query for server state; React Hook Form + Zod for user forms.
- Supabase Auth, PostgreSQL/PostGIS, Storage, and Edge Functions.
- Initial scaffold targets Expo SDK 58 / React Native 0.88 / React 19.3 per the current Expo SDK reference; resolve exact dependency compatibility with Expo tooling when npm is available.
- Provider ports and normalized domain models isolate Google and transport providers.

## Layers
`app/` routes and presentation → `src/features/` feature services/hooks → `src/domain/` models/ranking/calculations → `src/providers/` normalized provider adapters → Supabase Edge Functions/Postgres. Do not put vendor response types in UI components.

## First vertical slice
The local editorial detail can render offline from an explicitly labeled sample fixture. A Places Edge Function is the only place that reads the Google server key and requests a narrow field mask. A universal Google Maps URL is generated client-side and uses a Place ID when available. Attribution accompanies any Google-sourced display. Without configured credentials, the UI explains that enrichment is unavailable and still permits Maps search/navigation.

## Provider ports
`PlacesProvider`, `DirectionsProvider`, `TransitProvider`, `LocalBusinessProvider`, `FoodDataProvider`, `ReviewsProvider`, and `ImageProvider`. Normalize routes, places, amount provenance, and source metadata before reaching feature code. Use bounded timeout/retry and structured errors.

## Shopping module
Category taxonomy is data-driven. Recommendations combine exact product/category match, verified specialties, mode priorities, distance, freshness, confidence, and purchase volume. Explanations cite the matched evidence. Price observations remain immutable observations with grade/unit/price type/source/time; stale or incomparable observations cannot power cheapest claims. Market specialties are hypotheses until an admin verification record exists.

## Maps and location
Request device location only in a user-initiated flow. Manual search remains available. Google Maps URLs work without a key. In-app map SDK configuration is deferred to the native build milestone; the first slice uses a map placeholder/list and external Maps action, with no fake route line.
