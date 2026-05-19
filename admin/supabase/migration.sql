-- ============================================================
-- PENATEC Admin — Products table migration
-- Execute no Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Create products table
create table if not exists public.products (
  id              uuid        primary key default gen_random_uuid(),
  name            text        not null,
  category        text        not null,
  description     text        not null,
  tab             text        not null
                              check (tab in ('produtos', 'maquinas')),
  variant         text        not null default 'dark-blue'
                              check (variant in (
                                'dark-blue', 'graphite', 'deep-navy',
                                'steel', 'warm-dark', 'industrial'
                              )),
  badge           text,
  destaque        boolean     not null default false,
  image_url       text,
  image_public_id text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 2. Auto-update updated_at on change
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

-- 3. Enable Row Level Security
alter table public.products enable row level security;

-- 4. Policy: only authenticated users (admins) can do anything
create policy "Authenticated users manage products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

-- 5. Policy: public (anon) can read — required for the penatec-app frontend
create policy "Public read access"
  on public.products
  for select
  to anon
  using (true);

-- ============================================================
-- AFTER running this migration:
--
-- 1. Create your admin user in Supabase:
--    Authentication > Users > Add user
--    (use your admin email and a strong password)
--
-- 2. Supabase auto-restricts access by RLS — only users that
--    sign in via Auth can read/write the products table.
-- ============================================================
