# psico.yerma

Sitio web de psicología infantil y juvenil de Yermain A. González C.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Supabase (PostgreSQL) para almacenar los contactos
- Resend para el aviso por correo
- Zod para validación
- Vitest para tests

## Cómo correr

Requiere Node.js 20+.

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=
```

- `SUPABASE_SERVICE_ROLE_KEY` es secreta y solo se usa en el servidor (nunca con prefijo `NEXT_PUBLIC_`).
- Base de datos: ejecuta `supabase/migrations/0001_create_contacts.sql` en el SQL Editor de Supabase.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Chequeo de tipos |
| `npm test` | Tests (Vitest) |

## Estructura

```
src/
├── app/                 # rutas (App Router) y route handler de contacto
├── components/          # UI compartida (layout/ y ui/)
├── features/contact/    # feature de contacto (schema, server, formulario)
├── lib/                 # infraestructura compartida (cliente Supabase)
└── content/site.ts      # todo el texto del sitio
```

## Deploy

Pensado para desplegarse gratis (Vercel o Cloudflare) conectando este repositorio, con
Supabase como base de datos. Recuerda configurar las variables de entorno en el host.
