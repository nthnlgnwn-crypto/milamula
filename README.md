# Milamula

Milamula is an exploratory children’s story, education, and activity product line.

The current MVP validates one paid product before building a subscription platform:

- printable story-and-activity kit
- optional printed worksheet pack
- optional parent-supervised 3D-printed character/object bundle
- simple preorder/interest capture

## MVP Scope

Built now:

- landing page
- Adventure Kit #1 detail page
- parent guide / how it works page
- safety and supervision language
- Supabase preorder interest form
- thank-you page

Not built yet:

- subscription billing
- child accounts
- parent account system
- payment gateway
- automated fulfillment
- CMS
- AI content generator

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Preorder Flow

The homepage preorder form posts to `app/api/preorders/route.ts`. The route
validates the submission, rejects simple bot-like requests, and then inserts the
preorder into Supabase with the public anon key. Row-level security stays enabled
on `milamula_preorders`.

Validation lives in `lib/preorderValidation.ts` and checks:

- parent name is present
- WhatsApp number is present and reasonably formatted
- email is optional, but must look valid when provided
- child age is optional, but must match the form options when provided
- notes are optional and limited to 800 characters

MVP spam protection is intentionally simple:

- hidden honeypot field
- minimum time before submission
- generic friendly errors for suspicious requests

No CAPTCHA, login, payment, or admin dashboard is included.

## Supabase Preorder Setup

The preorder route writes to a Supabase table named `milamula_preorders` using
the public anon key. Do not use a service role key in the frontend or in this MVP
route.

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `supabase/migrations/001_create_milamula_preorders.sql`.
4. Copy `.env.example` to `.env.local`.
5. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

6. Restart the development server.
7. Submit the preorder form on the homepage.
8. Confirm the row appears in Supabase Table Editor > `milamula_preorders`.

If environment variables are missing, the form should show a friendly setup error
instead of silently losing the submission.

## Data Capture

The current form captures:

- parent name
- WhatsApp number
- optional email
- optional child age
- optional notes
- kit interest: `Milamula Adventure Kit #1`
- source: `milamula_website`

The browser submits to the local app route. Supabase credentials are read only by
the route handler, using:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Local Testing

Without Supabase environment values, submit the homepage form and confirm it
shows a friendly configuration error. After `.env.local` is configured and the
SQL migration has been run, submit again and confirm a row appears in Supabase.

Run checks before shipping changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## CSV Export

For the MVP, export preorder rows manually from Supabase:

1. Open Supabase.
2. Go to Table Editor.
3. Select `milamula_preorders`.
4. Use the table export/download option to export rows as CSV.

This keeps the first version simple without adding a login-protected admin
dashboard or storing private service keys locally.

## Vercel Deployment

Before launching, configure Vercel production environment variables and run the
post-deploy smoke test in `docs/vercel-launch-checklist.md`.
