# Security and privacy

- No service-role, Google server, or privileged keys in mobile bundle.
- Restrict public Maps keys by application identifier and enabled API; separate environments and monitor quotas.
- Enable RLS on every exposed table and least-privilege grants. Users own only their personal rows; admin role is checked server-side and in database policy.
- Validate payloads and uploads; moderate submissions before publication; rate-limit search and write endpoints.
- Ask for location only when needed; allow manual place search; do not log precise location or other sensitive data.
- Apply signed/private photo storage rules where user-owned images are allowed; track consent and moderation.
- Add dependency/security scanning in CI and secrets scanning before release.

## Threat model
Risks include key extraction, abuse/cost spikes, forged admin claims, cross-user data access, spam/review manipulation, malicious uploads, location leakage, and stale/misleading market prices/routes. Mitigations are server-side keys, quota/rate limits, database-backed role checks, RLS, validation/moderation, minimal location retention, and visible provenance/freshness.
