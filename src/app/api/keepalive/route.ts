import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const authorization = request.headers.get("authorization");

    if (authorization !== `Bearer ${secret}`) {
      return Response.json({ error: "No autorizado." }, { status: 401 });
    }
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contacts")
    .select("id", { count: "exact", head: true })
    .limit(1);

  if (error) {
    console.error("Keepalive: no se pudo consultar Supabase.", error);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true, at: new Date().toISOString() });
}
