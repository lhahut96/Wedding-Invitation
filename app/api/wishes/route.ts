import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC LIMIT 100",
    );
    return Response.json(rows);
  } catch {
    return Response.json({ error: "db" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 100);
  const message = String(body?.message ?? "").trim().slice(0, 1000);
  if (!name || !message) return Response.json({ error: "invalid" }, { status: 400 });
  try {
    const { rows } = await pool.query(
      "INSERT INTO wishes (name, message) VALUES ($1, $2) RETURNING id, name, message, created_at",
      [name, message],
    );
    return Response.json(rows[0], { status: 201 });
  } catch {
    return Response.json({ error: "db" }, { status: 500 });
  }
}
