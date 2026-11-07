# Kolkata Explorer — agent instructions

## Project
This repository is a new Expo React Native application for Kolkata place, food, transport, itinerary, and shopping discovery. Treat shopping as a first-class product module.

## Engineering rules
- Keep provider-specific APIs behind typed interfaces; mobile screens consume normalized models.
- Never fabricate prices, reviews, routes, schedules, shop details, opening hours, or verification status. Clearly label fixtures as samples.
- Google Places content must be fetched through approved API mechanisms, use narrow field masks, and retain required attribution. Persist only data allowed by the applicable Google terms; Google Place IDs and application-owned editorial data are distinct.
- Keep all privileged keys server-side. Exposed Supabase tables require RLS policies and least-privilege grants.
- Require source, freshness, verification state, and confidence for factual market/transport/pricing assertions.
- Validate user input with Zod and keep localization-ready string boundaries.
- Update `docs/` when architecture, data sources, security, or known limitations change.
- For each milestone, run the documented checks when tooling and credentials permit; report commands and actual outcomes.

## Current project state
The repository began empty. See `docs/ROADMAP.md` for staged implementation and `docs/KNOWN_LIMITATIONS.md` for unavailable tooling and external credentials.
