create extension if not exists pgcrypto;
create extension if not exists postgis with schema extensions;

create type public.verification_status as enum ('pending', 'verified', 'rejected', 'stale');
create type public.amount_kind as enum ('official', 'provider_reported', 'administrator_verified', 'community_reported', 'estimated', 'unknown');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('contributor', 'administrator')),
  primary key (user_id, role)
);
create function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles where user_id = (select auth.uid()) and role = 'administrator');
$$;

create table public.data_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_url text,
  licence text,
  created_at timestamptz not null default now()
);
create table public.neighbourhoods (
  id uuid primary key default gen_random_uuid(), name text not null unique,
  location extensions.geography(Point,4326), source_id uuid references public.data_sources(id),
  verification public.verification_status not null default 'pending', last_checked_at timestamptz
);
create table public.place_categories (
  id uuid primary key default gen_random_uuid(), name text not null unique, parent_id uuid references public.place_categories(id)
);
create table public.places (
  id uuid primary key default gen_random_uuid(), name text not null, description text,
  category_id uuid references public.place_categories(id), neighbourhood_id uuid references public.neighbourhoods(id),
  address text, location extensions.geography(Point,4326), google_place_id text unique,
  editorial_source_id uuid references public.data_sources(id), verification public.verification_status not null default 'pending',
  confidence numeric(3,2) check (confidence between 0 and 1), last_checked_at timestamptz,
  published boolean not null default false, created_at timestamptz not null default now()
);
create index places_location_idx on public.places using gist(location);
create table public.food_shops (
  id uuid primary key default gen_random_uuid(), place_id uuid references public.places(id), name text not null,
  description text, published boolean not null default false, verification public.verification_status not null default 'pending',
  source_id uuid references public.data_sources(id), last_checked_at timestamptz
);
create table public.food_items (id uuid primary key default gen_random_uuid(), name text not null, category text);
create table public.shop_food_items (
  shop_id uuid not null references public.food_shops(id) on delete cascade, item_id uuid not null references public.food_items(id),
  price numeric(10,2), currency char(3) not null default 'INR', price_kind public.amount_kind not null default 'unknown', observed_at timestamptz,
  primary key (shop_id,item_id)
);
create table public.user_reviews (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  place_id uuid references public.places(id), food_shop_id uuid references public.food_shops(id), rating smallint not null check (rating between 1 and 5),
  body text, created_at timestamptz not null default now(), check (num_nonnulls(place_id, food_shop_id) = 1)
);
create table public.saved_places (user_id uuid not null default auth.uid() references auth.users(id) on delete cascade, place_id uuid not null references public.places(id), created_at timestamptz default now(), primary key(user_id,place_id));
create table public.itineraries (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null, is_private boolean not null default true, created_at timestamptz not null default now()
);
create table public.itinerary_stops (
  id uuid primary key default gen_random_uuid(), itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  place_id uuid references public.places(id), position integer not null check (position >= 0), unique(itinerary_id,position)
);
create table public.user_reports (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  entity_type text not null, entity_id uuid, message text not null, created_at timestamptz not null default now(), status public.verification_status not null default 'pending'
);
create table public.content_verification_logs (
  id uuid primary key default gen_random_uuid(), entity_type text not null, entity_id uuid not null,
  admin_id uuid not null default auth.uid() references auth.users(id), source_id uuid references public.data_sources(id),
  outcome public.verification_status not null, notes text, checked_at timestamptz not null default now()
);

-- Shopping is a core, data-driven domain. No market claims are seeded here.
create table public.shopping_categories (
  id uuid primary key default gen_random_uuid(), parent_id uuid references public.shopping_categories(id),
  name text not null, slug text not null unique, active boolean not null default true, created_at timestamptz not null default now()
);
create table public.shopping_areas (
  id uuid primary key default gen_random_uuid(), name text not null, description text, address text,
  neighbourhood_id uuid references public.neighbourhoods(id), location extensions.geography(Point,4326),
  market_type text check (market_type in ('street_market','market_complex','mall','wholesale_area','shopping_district','other')),
  budget_position text check (budget_position in ('budget','mid_range','premium','mixed','unknown')),
  published boolean not null default false, verification public.verification_status not null default 'pending',
  source_id uuid references public.data_sources(id), confidence numeric(3,2) check (confidence between 0 and 1),
  last_checked_at timestamptz, hours jsonb, weekly_closure text, parking_info text
);
create index shopping_areas_location_idx on public.shopping_areas using gist(location);
create table public.shopping_area_specialties (
  id uuid primary key default gen_random_uuid(), area_id uuid not null references public.shopping_areas(id) on delete cascade,
  category_id uuid not null references public.shopping_categories(id), specialty text not null,
  source_id uuid references public.data_sources(id), verification public.verification_status not null default 'pending',
  confidence numeric(3,2) check (confidence between 0 and 1), checked_at timestamptz, unique(area_id,category_id,specialty)
);
create table public.retail_shops (
  id uuid primary key default gen_random_uuid(), area_id uuid references public.shopping_areas(id), name text not null,
  description text, address text, location extensions.geography(Point,4326), google_place_id text unique,
  published boolean not null default false, verification public.verification_status not null default 'pending',
  source_id uuid references public.data_sources(id), last_checked_at timestamptz, hours jsonb
);
create index retail_shops_location_idx on public.retail_shops using gist(location);
create table public.retail_shop_categories (
  shop_id uuid not null references public.retail_shops(id) on delete cascade,
  category_id uuid not null references public.shopping_categories(id), primary key(shop_id,category_id)
);
create table public.products (
  id uuid primary key default gen_random_uuid(), category_id uuid references public.shopping_categories(id),
  name text not null, normalized_name text not null, grade text, unit text not null, created_at timestamptz not null default now()
);
create table public.shop_products (
  shop_id uuid not null references public.retail_shops(id) on delete cascade, product_id uuid not null references public.products(id),
  retail_available boolean not null default true, wholesale_available boolean not null default false, primary key(shop_id,product_id)
);
create table public.price_observations (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id),
  shop_id uuid references public.retail_shops(id), area_id uuid references public.shopping_areas(id),
  amount numeric(12,2) check (amount >= 0), currency char(3) not null default 'INR', quantity numeric(12,3) not null check(quantity > 0),
  unit text not null, grade text, price_type text not null check(price_type in ('advertised','seller_reported','administrator_verified','community_reported','estimated')),
  sale_type text not null check(sale_type in ('retail','wholesale')), source_id uuid references public.data_sources(id),
  verification public.verification_status not null default 'pending', observed_at timestamptz not null,
  contributor_id uuid references auth.users(id), confidence numeric(3,2) check (confidence between 0 and 1)
);
create index price_observations_match_idx on public.price_observations(product_id, observed_at desc, verification);
create table public.shopping_reviews (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  area_id uuid references public.shopping_areas(id), shop_id uuid references public.retail_shops(id),
  quality smallint check(quality between 1 and 5), value_rating smallint check(value_rating between 1 and 5),
  variety smallint check(variety between 1 and 5), service smallint check(service between 1 and 5), authenticity smallint check(authenticity between 1 and 5),
  availability smallint check(availability between 1 and 5), returns_experience smallint check(returns_experience between 1 and 5), overall smallint not null check(overall between 1 and 5),
  body text, created_at timestamptz not null default now(), moderated boolean not null default false,
  check(num_nonnulls(area_id,shop_id)=1)
);
create table public.shopping_review_photos (id uuid primary key default gen_random_uuid(), review_id uuid not null references public.shopping_reviews(id) on delete cascade, storage_path text not null, attribution text, consent boolean not null default false, moderated boolean not null default false);
create table public.shopping_area_transport (
  id uuid primary key default gen_random_uuid(), area_id uuid not null references public.shopping_areas(id) on delete cascade,
  mode text not null, name text not null, stop_location extensions.geography(Point,4326), source_id uuid references public.data_sources(id), verification public.verification_status not null default 'pending', last_checked_at timestamptz
);
create table public.shopping_recommendations (
  id uuid primary key default gen_random_uuid(), category_id uuid not null references public.shopping_categories(id),
  area_id uuid not null references public.shopping_areas(id), mode text not null, explanation text not null,
  source_id uuid references public.data_sources(id), verification public.verification_status not null default 'pending',
  confidence numeric(3,2) check (confidence between 0 and 1), last_checked_at timestamptz, active boolean not null default false
);
create table public.shopping_data_sources (
  id uuid primary key default gen_random_uuid(), source_id uuid not null references public.data_sources(id),
  entity_type text not null, entity_id uuid not null, captured_at timestamptz not null default now(), attribution text
);

-- All exposed tables use RLS. Public reads are limited to explicitly published/verified records.
do $$ declare t text; begin
  foreach t in array array['profiles','user_roles','data_sources','neighbourhoods','place_categories','places','food_shops','food_items','shop_food_items','user_reviews','saved_places','itineraries','itinerary_stops','user_reports','content_verification_logs','shopping_categories','shopping_areas','shopping_area_specialties','retail_shops','retail_shop_categories','products','shop_products','price_observations','shopping_reviews','shopping_review_photos','shopping_area_transport','shopping_recommendations','shopping_data_sources'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

create policy "published places readable" on public.places for select using (published or public.is_admin());
create policy "published shopping areas readable" on public.shopping_areas for select using (published or public.is_admin());
create policy "published shopping shops readable" on public.retail_shops for select using (published or public.is_admin());
create policy "active categories readable" on public.shopping_categories for select using (active or public.is_admin());
create policy "verified specialties readable" on public.shopping_area_specialties for select using (verification='verified' or public.is_admin());
create policy "published shop categories readable" on public.retail_shop_categories for select using (exists(select 1 from public.retail_shops s where s.id=shop_id and s.published));
create policy "products readable" on public.products for select using (exists(select 1 from public.shop_products sp join public.retail_shops s on s.id=sp.shop_id where sp.product_id=id and s.published) or public.is_admin());
create policy "published shop products readable" on public.shop_products for select using (exists(select 1 from public.retail_shops s where s.id=shop_id and s.published));
create policy "verified recent prices readable" on public.price_observations for select using ((verification='verified' and observed_at >= now()-interval '120 days') or public.is_admin());
create policy "active recommendations readable" on public.shopping_recommendations for select using ((active and verification='verified') or public.is_admin());
create policy "published food shops readable" on public.food_shops for select using (published or public.is_admin());
create policy "users manage own profile" on public.profiles for all using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "users manage own saved places" on public.saved_places for all using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "users manage own itineraries" on public.itineraries for all using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "users manage stops in own itinerary" on public.itinerary_stops for all using (exists(select 1 from public.itineraries i where i.id=itinerary_id and i.user_id=(select auth.uid()))) with check (exists(select 1 from public.itineraries i where i.id=itinerary_id and i.user_id=(select auth.uid())));
create policy "users create own reviews" on public.user_reviews for insert with check (user_id = (select auth.uid()));
create policy "users edit own reviews" on public.user_reviews for update using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "reviews readable" on public.user_reviews for select using (true);
create policy "users submit reports" on public.user_reports for insert with check (user_id = (select auth.uid()));
create policy "users read own reports" on public.user_reports for select using (user_id = (select auth.uid()) or public.is_admin());
create policy "admins manage roles" on public.user_roles for all using (public.is_admin()) with check (public.is_admin());
create policy "source records readable" on public.data_sources for select using (true);
create policy "neighbourhoods readable" on public.neighbourhoods for select using (true);
create policy "place categories readable" on public.place_categories for select using (true);
create policy "food items readable" on public.food_items for select using (true);
create policy "food item associations readable" on public.shop_food_items for select using (exists(select 1 from public.food_shops s where s.id=shop_id and s.published));
create policy "transport verification records readable" on public.content_verification_logs for select using (public.is_admin());
create policy "shopping transport readable" on public.shopping_area_transport for select using (verification='verified' or public.is_admin());
create policy "shopping data provenance readable" on public.shopping_data_sources for select using (public.is_admin());

-- Admin-only mutation policies for verified editorial and shopping data.
do $$ declare t text; begin
  foreach t in array array['places','food_shops','shopping_categories','shopping_areas','shopping_area_specialties','retail_shops','retail_shop_categories','products','shop_products','price_observations','shopping_area_transport','shopping_recommendations','data_sources','content_verification_logs'] loop
    execute format('create policy "admins manage %I" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t, t);
  end loop;
end $$;
create policy "shopping reviews readable" on public.shopping_reviews for select using (moderated or user_id=(select auth.uid()) or public.is_admin());
create policy "users create shopping reviews" on public.shopping_reviews for insert with check (user_id=(select auth.uid()));
create policy "users manage own shopping reviews" on public.shopping_reviews for update using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
create policy "owners submit review photos" on public.shopping_review_photos for insert with check (moderated=false and consent=true and exists(select 1 from public.shopping_reviews r where r.id=review_id and r.user_id=(select auth.uid())));
create policy "review photos readable" on public.shopping_review_photos for select using (moderated or exists(select 1 from public.shopping_reviews r where r.id=review_id and r.user_id=(select auth.uid())) or public.is_admin());
create policy "admins moderate shopping reviews" on public.shopping_reviews for all using (public.is_admin()) with check (public.is_admin());
create policy "admins moderate review photos" on public.shopping_review_photos for all using (public.is_admin()) with check (public.is_admin());

grant select on public.places, public.food_shops, public.shopping_categories, public.shopping_areas, public.shopping_area_specialties, public.retail_shops, public.retail_shop_categories, public.products, public.shop_products, public.price_observations, public.shopping_recommendations to anon, authenticated;
grant select on public.neighbourhoods, public.place_categories, public.food_items, public.shop_food_items, public.data_sources, public.shopping_area_transport, public.shopping_data_sources to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.saved_places, public.itineraries, public.itinerary_stops, public.user_reviews, public.user_reports to authenticated;
grant select, insert on public.shopping_reviews, public.shopping_review_photos to authenticated;
grant select, insert, update, delete on public.places, public.food_shops, public.shopping_categories, public.shopping_areas, public.shopping_area_specialties, public.retail_shops, public.retail_shop_categories, public.products, public.shop_products, public.price_observations, public.shopping_area_transport, public.shopping_recommendations, public.data_sources, public.content_verification_logs, public.user_roles to authenticated;
grant update, delete on public.shopping_reviews, public.shopping_review_photos to authenticated;
