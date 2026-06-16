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
- static preorder interest form placeholder
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

## Data Capture

The current form is static and submits to `/thank-you` with query parameters. Connect it later to Supabase, Airtable, Google Forms, or another backend before collecting real customer data.
