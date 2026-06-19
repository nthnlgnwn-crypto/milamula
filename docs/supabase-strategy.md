# TaleMori Supabase Strategy

## Current Context

TaleMori is a Next.js and TypeScript MVP for validating `Mori and the Lost Moonlight`.
The current preorder flow posts from the browser to `/api/preorders`. The API route
validates the payload, applies simple spam checks, and inserts into Supabase with
the public anon key. The direct browser-to-Supabase insert has been removed.

The first migration creates `public.milamula_preorders`, enables RLS, grants anon
insert, and adds an insert-only policy. The table name intentionally remains
`public.milamula_preorders` after the TaleMori rebrand to avoid unnecessary
production migration risk.

Migration `002_update_talemori_preorder_policy.sql` updates defaults and replaces
the insert policy so transition inserts can use either:

- old pair: `kit_interest = 'Milamula Adventure Kit #1'` and `source = 'milamula_website'`
- new pair: `kit_interest = 'Mori and the Lost Moonlight'` and `source = 'talemori_website'`

No public read, update, or delete policy exists.

## Recommendation

Use the existing Creatoroom production Supabase project for Milamula MVP preorder
capture, but keep Milamula isolated with a clearly prefixed table:

```sql
public.milamula_preorders
```

Before touching Creatoroom production, run the same migration and one test insert
against Creatoroom staging. Staging should be used only to prove the migration and
application flow. Real Milamula preorder leads should go to Creatoroom production
until Milamula is validated enough to justify a separate Supabase project.

## Why This Is Recommended

This is the lowest-cost setup that still has a defensible isolation boundary for
the current MVP. Milamula only needs one append-only preorder table. The current
API route uses the anon key server-side, keeps RLS enabled, and grants no public
read access.

Supabase's free tier is enough for MVP preorder validation in normal conditions:
official Supabase billing docs currently list 500 MB database size on Free, and
the pricing page lists Free plan usage limits such as 50,000 monthly active users,
5 GB bandwidth, and 2 active projects. A preorder table with names, WhatsApp
numbers, optional emails, child age, and notes should stay far below these limits.

## Option Comparison

### Option A: Creatoroom Production With Milamula Table

Recommended for real MVP collection after staging smoke test.

Pros:

- no new paid Supabase project
- stable production project for real leads
- simple `.env.local` setup
- current migration works with minimal operational complexity
- clear table prefix separates Milamula from Creatoroom tables

Cons:

- Creatoroom and Milamula data share one production project
- accidental SQL changes in the shared project have broader blast radius
- future Milamula auth, CMS, payment, analytics, or child-profile data would make
  sharing less appropriate

### Option B: Creatoroom Staging Temporarily

Recommended only for first technical smoke test.

Pros:

- validates migration and app flow before touching production
- avoids polluting production during setup

Cons:

- not the right place for real customer leads
- staging credentials in production deployment would be an operational mistake

### Option C: New Supabase Project Later

Recommended once Milamula is validated or needs more than preorder capture.

Move Milamula to its own project when it needs auth, payment records, CMS content,
analytics, child profiles, file storage, or a production-grade operational boundary.

### Option D: Tally, Airtable, or Google Sheet First

Acceptable if speed matters more than owning the data model.

For the current implementation, this is not necessary. The app already has a
server-side route, validation, spam checks, RLS, and a migration. Switching to a
form tool would reduce database mixing risk but adds another vendor and discards
the work already done.

## Table and Schema Naming

Keep the current migration as:

```sql
public.milamula_preorders
```

Do not move to `milamula.preorders` yet.

A separate `milamula` schema is conceptually cleaner, but it requires extra
Supabase Data API configuration, schema exposure decisions, grants, and client
query changes. For a single append-only MVP table, the prefixed public table is
the safer operational choice.

If Milamula later adds multiple tables, use a dedicated schema or a separate
Supabase project instead of continuing to add many public tables.

## Environment Variables

Keep Milamula environment variables in Milamula deployment settings only:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

For local testing:

- use Creatoroom staging values first
- after smoke test passes, switch `.env.local` to Creatoroom production values for
  real production verification

Do not reuse Creatoroom app `.env` files. Do not add a service role key to
Milamula.

## Manual Supabase Configuration

In Creatoroom staging first, then production:

1. Open Supabase SQL Editor.
2. Run `supabase/migrations/001_create_milamula_preorders.sql` if the table does not already exist.
3. Run `supabase/migrations/002_update_talemori_preorder_policy.sql`.
4. Confirm `public.milamula_preorders` exists.
5. Confirm RLS is enabled.
6. Confirm the only public policy is anon insert for intended kit/source pairs.
7. Confirm no anon select, update, or delete policy exists.
8. Put the project URL and anon key into Milamula `.env.local` or deployment env.
9. Restart the dev server or redeploy.
10. Submit one test preorder.
11. Confirm the row appears with `Mori and the Lost Moonlight` and `talemori_website`.

## When To Move Milamula To Its Own Supabase Project

Move Milamula to a separate project before adding any of these:

- user accounts or parent login
- child profiles or child-related personal data
- payments, invoices, or order history
- CMS/editor workflows
- file uploads or generated activity assets
- analytics event tables
- automated fulfillment
- multiple Milamula product tables
- production traffic high enough to compete with Creatoroom limits

The trigger is not only cost. The stronger reason is operational separation:
backup/restore, access control, incident response, schema ownership, and privacy
boundaries become harder when unrelated products share a project.

## Checklist Before Real Insert Tests

- run the migration in Creatoroom staging
- add Creatoroom staging URL and anon key to Milamula `.env.local`
- restart the dev server
- submit a valid test preorder from the homepage
- verify success UI
- verify row values in Supabase
- test missing name, invalid WhatsApp, invalid email, and honeypot rejection
- repeat migration in Creatoroom production
- switch Milamula env values to Creatoroom production
- submit one production test row
- delete or label test rows so they are not treated as customer leads

## What Not To Do Yet

- do not add payment
- do not add login
- do not add an admin dashboard
- do not add CMS tables
- do not add analytics tables
- do not add child profiles
- do not add CAPTCHA unless spam becomes a real issue
- do not add a Supabase service role key to the Milamula app

## Sources

- Supabase billing quotas: https://supabase.com/docs/guides/platform/billing-on-supabase
- Supabase pricing: https://supabase.com/pricing
- Supabase RLS guidance: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase API security guidance: https://supabase.com/docs/guides/api/securing-your-api
