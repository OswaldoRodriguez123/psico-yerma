-- Tabla de clientes (V2). Datos mínimos: representante + paciente.
-- Ejecutar en Supabase: SQL Editor -> New query -> pegar y Run.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  representative_name text not null,
  representative_phone text not null,
  representative_email text,
  patient_name text not null,
  patient_birth_date date,
  notes text,
  created_at timestamptz not null default now()
);

-- RLS activado sin policies: solo la service role key (servidor) puede acceder.
alter table public.clients enable row level security;
