# Testing strategy

## Planned commands
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `supabase test db`
- `npx expo-doctor`

## Coverage
Unit: route ranking, shopping recommendation explanations, price comparability/freshness, budget arithmetic, distances, validation, provider normalization.
Integration: Places and Routes adapters, Supabase persistence/auth/RLS, itineraries, transport lookup.
UI: search, place detail/attribution/Maps action, food and shopping filters, mode switching, compare, itinerary editing, loading/error/empty states.

Use explicit sample fixtures only in tests and label them. Test anon/authenticated/contributor/admin RLS boundaries. Run mobile build only with configured native tooling/credentials. Record outcomes rather than asserting unrun checks.
