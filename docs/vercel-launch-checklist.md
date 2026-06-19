# TaleMori Vercel Launch Checklist

## Scope

This checklist covers Vercel production environment setup and preorder smoke
testing for the TaleMori MVP. It does not add payment, dashboard, login, CMS,
analytics, CAPTCHA, child profiles, AI generation, marketplace features, or
automated fulfillment.

## Required Vercel Environment Variables

Configure these variables in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Use only the Supabase publishable or anon public key. Do not use a service-role
key in Vercel for this app.

## Production Values

For Vercel Production, use Creatoroom production Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ndqblzejaqjnwmyomhgd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<creatoroom-production-publishable-or-anon-key>
```

The production table `public.milamula_preorders` has already passed the smoke
test:

- PostgREST visibility returned `HTTP 200`
- fake preorder insert through `/api/preorders` returned `200 {"ok":true}`
- anon read returned no rows
- wrong-source insert was rejected by RLS
- anon update/delete affected zero rows

## Local Development Values

For local development, keep `.env.local` pointed at Creatoroom staging:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://oekambwvgqkdscclafoq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<creatoroom-staging-publishable-or-anon-key>
```

Do not commit `.env.local`. Production credentials should live in Vercel
environment variables, not as the default local development target.

## Where To Configure Env Vars In Vercel

1. Open the TaleMori project in Vercel.
2. Go to Settings.
3. Go to Environment Variables.
4. Add `NEXT_PUBLIC_SUPABASE_URL`.
5. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Scope both variables to Production.
7. Optionally add separate staging values to Preview if preview deployments should
   write to Creatoroom staging.
8. Save changes.
9. Redeploy the latest production deployment so the variables are available at
   runtime.

Vercel deployments do not automatically pick up changed environment variables
until a new deployment is created.

## Deploy Readiness Review

The current implementation is compatible with Vercel production deployment:

- no runtime local filesystem paths are used by `/api/preorders`
- `.env.local` is not required in Vercel
- Supabase env vars are read from `process.env`
- the browser posts to the app-relative `/api/preorders` route
- validation and spam checks use only request payload data and server time
- no service-role key is needed

## Post-Deploy Smoke Test

Use fake test data only. Do not use real customer data.

Submit this preorder through the deployed TaleMori homepage:

- Parent name: `Production Test Parent TaleMori`
- WhatsApp: `+6281234567890`
- Email: `production.test.talemori@example.com`
- Child age: `5-6`
- Notes: `Production smoke test only`

Expected app behavior:

- form shows success
- no payment is charged
- `/api/preorders` returns success

## Manual Supabase Verification

Because public read is blocked by RLS, verify the row manually in Creatoroom
production Supabase Table Editor.

Expected row values:

- `parent_name = 'Production Test Parent TaleMori'`
- `whatsapp = '+6281234567890'`
- `email = 'production.test.talemori@example.com'`
- `child_age = '5-6'`
- `kit_interest = 'Mori and the Lost Moonlight'`
- `source = 'talemori_website'`
- `created_at` is populated

## Cleanup

After verification, manually delete only the fake production test row:

```text
email = production.test.talemori@example.com
```

or:

```text
parent_name = Production Test Parent TaleMori
```

Do not delete any other rows.

## Rollback Notes

If the deployed form cannot submit:

1. Confirm Vercel Production env vars are present.
2. Confirm the deployment was redeployed after env changes.
3. Confirm `NEXT_PUBLIC_SUPABASE_URL` points to `ndqblzejaqjnwmyomhgd`.
4. Confirm `public.milamula_preorders` is visible to PostgREST.
5. Confirm migration `002_update_talemori_preorder_policy.sql` has been run.
6. Confirm RLS still has the anon insert policy for TaleMori values.
6. Revert the Vercel deployment to the previous working deployment if the issue is
   user-facing.

If a fake row was inserted before failure investigation, delete only that fake row
after verifying its email or parent name.

## Stop Conditions

Do not launch real preorder collection if:

- Vercel production env vars are missing
- Vercel production env vars point to staging
- the deployed form does not show success for the fake row
- the row cannot be manually verified in Creatoroom production
- public read returns real rows
- the fake row cannot be deleted
