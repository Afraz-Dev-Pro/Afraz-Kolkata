# Implementation roadmap

1. **Analysis and docs** — repository inventory, requirements, provider/data/security plans, shopping treated as core. (Completed for this milestone.)
2. **Foundation** — Expo SDK 58 scaffold, Router, Supabase client config, initial SQL schema, lint/type/test commands. (Scaffold created; dependency install and compatibility verification pending.)
3. **Place vertical slice** — curated offline directory, detail route, optional Places Details Edge Function, attribution display, Maps URL, URL unit tests. (Code path implemented; live provider and native verification pending credentials/tooling.)
4. **Discovery and food** — initial curated directory and browse/search filters are implemented. Reviews, report corrections, and admin verification remain pending.
5. **Shopping Explorer** — category taxonomy, research-candidate markets, specialties/provenance, explainable ranking, comparable price observations, comparison, shops/reviews, shopping routes.
6. **Transport and cost** — official/licensed import workflow, route normalization and ranking, cost provenance/freshness.
7. **Itineraries and admin** — an offline multi-stop day-plan editor and share action are implemented. Persistent plans, budgets, and curation/import/moderation dashboard workflow remain pending.
8. **Quality/release** — RLS/security review, test matrix, performance, accessibility, data validation, native build and store setup.

## Android APK profile
The `preview` EAS profile is configured to produce an internally distributable `.apk`; use `npm run build:apk` after dependencies are installed and the project is linked to an Expo account. Cloud builds require EAS authentication and Android signing credentials. The `production` profile emits an Android App Bundle for store submission.

Each milestone requires implementation, relevant automated checks, docs update, and explicit limitations. Do not mark a milestone complete based on UI alone.
