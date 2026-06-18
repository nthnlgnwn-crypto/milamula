# Creatoroom Production Supabase Migration Checklist

## Scope

This checklist prepares Creatoroom production Supabase for Milamula preorder
capture only. It does not add payment, login, dashboard, CMS, analytics, CAPTCHA,
child profiles, AI generation, marketplace features, or automated fulfillment.

Use fake test data only for the production smoke test. Do not use real customer
data until the migration and test row have been verified.

## Production Readiness

The current migration is safe to run in Creatoroom production because it:

- creates only `public.milamula_preorders`
- uses a clearly prefixed Milamula table name
- does not drop, rename, or alter existing Creatoroom tables
- enables RLS on the Milamula preorder table
- grants anon insert on the Milamula preorder table
- allows anon insert only for `kit_interest = 'Milamula Adventure Kit #1'`
- allows anon insert only for `source = 'milamula_website'`
- creates no public read, update, or delete policy

## Pre-Migration Checklist

- Confirm Creatoroom staging smoke test has passed.
- Confirm the staging fake row has been manually deleted.
- Confirm you are logged into the Creatoroom production Supabase project.
- Confirm the browser URL is the production project, not staging.
- Confirm no customer data will be used for the smoke test.
- Keep Milamula `.env.local` on staging until production migration is complete.
- Do not add a service role key to Milamula.

## Exact Project Verification

Before running SQL, verify the Supabase dashboard URL belongs to Creatoroom
production.

Check:

- project name is Creatoroom production
- project ref matches the known production ref
- SQL Editor is open for production, not staging
- Table Editor currently does not already contain an unexpected
  `milamula_preorders` table

If anything is ambiguous, stop before running SQL.

## SQL To Run

Run this file in Creatoroom production Supabase SQL Editor:

```text
supabase/migrations/001_create_milamula_preorders.sql
```

Do not run any unrelated SQL.

## Post-Migration Verification SQL

Run:

```sql
select to_regclass('public.milamula_preorders');
notify pgrst, 'reload schema';
```

Expected result:

```text
milamula_preorders
```

Then verify in Table Editor:

- `public.milamula_preorders` exists
- RLS is enabled
- anon insert policy exists
- no anon select policy exists
- no anon update policy exists
- no anon delete policy exists

## Production Environment Variables

After the production migration is verified, configure Milamula production runtime
with Creatoroom production Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<creatoroom-production-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<creatoroom-production-publishable-or-anon-key>
```

Use these values only in the Milamula deployment environment or a temporary local
production smoke test environment.

Do not:

- copy Creatoroom app environment files wholesale
- use staging credentials for real collection
- use a Supabase service role key
- commit `.env.local`

## Production Smoke-Test Row

Use this fake row only:

- Parent name: `Production Test Parent Milamula`
- WhatsApp: `+6281234567890`
- Email: `production.test.milamula@example.com`
- Child age: `5-6`
- Notes: `Production smoke test only`

## Production Insert Test

After production env values are configured:

1. Restart the Milamula server or redeploy Milamula.
2. Open the Milamula homepage.
3. Submit the production smoke-test row.
4. Confirm the form shows success.
5. Confirm the API returns success.
6. Open Supabase Table Editor.
7. Confirm exactly one row exists for `production.test.milamula@example.com`.

Expected row values:

- `parent_name = 'Production Test Parent Milamula'`
- `whatsapp = '+6281234567890'`
- `email = 'production.test.milamula@example.com'`
- `child_age = '5-6'`
- `kit_interest = 'Milamula Adventure Kit #1'`
- `source = 'milamula_website'`
- `created_at` is populated

## RLS Verification

Using the public anon key, verify:

- valid Milamula insert succeeds
- read returns no rows
- wrong-source insert is rejected
- update affects zero rows
- delete affects zero rows

Do not weaken RLS to make readback easier.

## Delete The Production Test Row

After verification, manually delete only the test row in Supabase Table Editor:

```text
email = production.test.milamula@example.com
```

or:

```text
parent_name = Production Test Parent Milamula
```

Do not delete any other rows.

## Rollback And Cleanup Notes

If the migration was run in the wrong project, stop and document exactly where it
was run before deleting anything.

If no real customer rows exist and you need to remove the Milamula table:

```sql
drop table if exists public.milamula_preorders;
```

Only run the drop statement after confirming there are no real Milamula leads in
the table.

If the table exists but API calls return `PGRST205`, run:

```sql
notify pgrst, 'reload schema';
```

If insert fails with RLS errors, verify the payload contains:

```text
kit_interest = Milamula Adventure Kit #1
source = milamula_website
```

## Stop Conditions

Stop before collecting real leads if:

- production project identity is uncertain
- SQL was run in staging instead of production
- `public.milamula_preorders` does not appear after schema reload
- form insert does not return success
- RLS allows public read
- the production test row cannot be manually verified
- the production test row cannot be deleted
