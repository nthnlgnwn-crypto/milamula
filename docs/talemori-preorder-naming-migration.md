# TaleMori Preorder Naming Migration

## Current State

The visible website now uses:

- brand: `TaleMori`
- first kit: `Mori and the Lost Moonlight`
- preorder source: TaleMori website

The Supabase table intentionally remains:

```sql
public.milamula_preorders
```

Do not rename this table yet. Renaming the table would require app query changes,
PostgREST cache handling, documentation updates, and more production risk without
improving the user-facing experience.

## New Row Values

New TaleMori submissions should store:

```text
kit_interest = Mori and the Lost Moonlight
source = talemori_website
```

Older rows may still store:

```text
kit_interest = Milamula Adventure Kit #1
source = milamula_website
```

Preserve those rows. They are valid historical pre-rebrand leads unless manually
confirmed as test data.

## Migration Strategy

Run:

```text
supabase/migrations/002_update_talemori_preorder_policy.sql
```

The migration:

- preserves `public.milamula_preorders`
- preserves all existing rows
- updates column defaults to TaleMori values
- replaces the anon insert policy
- allows both old and new kit/source pairs during transition
- does not add public read, update, or delete policies
- does not use a service role key

The transition policy is intentional. It prevents production breakage if an older
deployment or local environment briefly submits the old values while the new app
version is rolling out.

## Manual Staging Steps

1. Open Creatoroom staging Supabase.
2. Confirm the project ref is staging.
3. Run `supabase/migrations/002_update_talemori_preorder_policy.sql`.
4. Run:

```sql
select to_regclass('public.milamula_preorders');
notify pgrst, 'reload schema';
```

5. Point local `.env.local` to Creatoroom staging.
6. Restart the local dev server.
7. Submit one fake test row:

```text
Parent name: TaleMori Staging Test Parent
WhatsApp: +6281234567890
Email: talemori.staging.test@example.com
Child age: 5-6
Notes: TaleMori naming migration staging smoke test only
```

8. Verify the row in Supabase Table Editor:

```text
kit_interest = Mori and the Lost Moonlight
source = talemori_website
```

9. Confirm public read remains blocked.
10. Confirm wrong-source insert is rejected.
11. Delete only the fake staging row.

## Manual Production Steps

Proceed only after staging passes.

1. Open Creatoroom production Supabase.
2. Confirm the project ref is production.
3. Run `supabase/migrations/002_update_talemori_preorder_policy.sql`.
4. Run:

```sql
select to_regclass('public.milamula_preorders');
notify pgrst, 'reload schema';
```

5. Deploy or redeploy the app version that uses TaleMori constants.
6. Submit one fake production test row:

```text
Parent name: TaleMori Production Test Parent
WhatsApp: +6281234567890
Email: talemori.production.test@example.com
Child age: 5-6
Notes: TaleMori naming migration production smoke test only
```

7. Verify the row in Supabase Table Editor:

```text
kit_interest = Mori and the Lost Moonlight
source = talemori_website
```

8. Confirm public read remains blocked.
9. Confirm wrong-source insert is rejected.
10. Delete only the fake production row.

## Future Cleanup

Do not perform cleanup now.

Possible future cleanup, after real collection is stable:

- migrate old non-test rows from Milamula values to TaleMori values
- tighten RLS to allow only TaleMori values
- create a new TaleMori-specific table in a separate Supabase project
- rename internal TypeScript type names for clarity

Avoid these until there is a clear operational need.
