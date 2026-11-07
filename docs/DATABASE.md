# Database design

Use versioned SQL migrations, PostGIS geography(Point, 4326), foreign keys, constraints, and indexes. Exposed tables must enable RLS; policies are paired with least-privilege grants. Admin authorization is database-backed and never inferred from client metadata.

## Core tables
- `profiles`, `user_roles`
- `neighbourhoods`, `place_categories`, `places`
- `food_shops`, `food_items`, `shop_food_items`
- `transport_operators`, `transport_routes`, `transport_stops`, `transport_route_stops`, `fare_rules`, `fare_observations`, `route_sources`
- `user_reviews`, `review_photos`, `saved_places`, `saved_food_shops`, `itineraries`, `itinerary_stops`, `user_reports`
- `data_sources`, `content_verification_logs`

## Shopping tables
- `shopping_categories` (self-referencing parent for extensible subcategories)
- `shopping_areas`, `shopping_area_specialties`
- `retail_shops`, `retail_shop_categories`
- `products`, `shop_products`, `price_observations`
- `shopping_reviews`, `shopping_review_photos`, `shopping_area_transport`
- `shopping_recommendations`, `shopping_data_sources`

## Provenance and permissions
Factual records carry source, observed/checked timestamps, verification state, confidence, and contributor/admin identity. Google-sourced transient data is not copied into permanent editorial tables. Users can manage only their own review, report, saved, and private itinerary records. Published verified market/business/transport facts are admin-controlled. User reports remain pending until moderated.

## Important constraints
Prices use ISO currency code, amount, unit/quantity, product grade, retail/wholesale, source and observed_at. Reviews keep Google and app-owned sources separate. Transport route stops have a unique route/direction/sequence key. A verified claim requires verification metadata.
