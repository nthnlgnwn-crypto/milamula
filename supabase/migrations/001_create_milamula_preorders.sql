create extension if not exists pgcrypto;

create table if not exists public.milamula_preorders (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  whatsapp text not null,
  email text,
  child_age text,
  kit_interest text not null default 'Milamula Adventure Kit #1',
  notes text,
  source text not null default 'milamula_website',
  created_at timestamptz not null default now()
);

alter table public.milamula_preorders enable row level security;

drop policy if exists "Allow public preorder inserts" on public.milamula_preorders;

create policy "Allow public preorder inserts"
on public.milamula_preorders
for insert
to anon
with check (
  parent_name <> ''
  and whatsapp <> ''
  and kit_interest = 'Milamula Adventure Kit #1'
  and source = 'milamula_website'
);

grant usage on schema public to anon;
grant insert on public.milamula_preorders to anon;
