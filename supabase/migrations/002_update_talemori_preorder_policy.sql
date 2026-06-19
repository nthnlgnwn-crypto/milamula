alter table public.milamula_preorders
  alter column kit_interest set default 'Mori and the Lost Moonlight',
  alter column source set default 'talemori_website';

alter table public.milamula_preorders enable row level security;

drop policy if exists "Allow public preorder inserts" on public.milamula_preorders;

create policy "Allow public preorder inserts"
on public.milamula_preorders
for insert
to anon
with check (
  btrim(parent_name) <> ''
  and btrim(whatsapp) <> ''
  and (
    (
      kit_interest = 'Milamula Adventure Kit #1'
      and source = 'milamula_website'
    )
    or (
      kit_interest = 'Mori and the Lost Moonlight'
      and source = 'talemori_website'
    )
  )
);

grant usage on schema public to anon;
grant insert on public.milamula_preorders to anon;
