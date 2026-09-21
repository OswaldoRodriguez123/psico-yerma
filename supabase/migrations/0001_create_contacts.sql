-- Tabla de contactos del sitio (V1).
-- Ejecutar en Supabase: SQL Editor -> New query -> pegar y Run.

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  reason text not null,
  message text not null,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  constraint contacts_has_contact_method check (email is not null or phone is not null)
);

-- RLS activado sin policies: nadie puede leer ni escribir con la clave anónima.
-- El servidor usa la service role key, que omite RLS.
alter table public.contacts enable row level security;
