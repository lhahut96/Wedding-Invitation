import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 100);
  const attending = body?.attending;
  const side = body?.side === "bride" || body?.side === "groom" ? body.side : null;
  const guests = Math.min(10, Math.max(0, Math.floor(Number(body?.guests ?? 1)) || 0));
  const phone = String(body?.phone ?? "").trim().slice(0, 30) || null;
  const note = String(body?.note ?? "").trim().slice(0, 500) || null;
  if (!name || typeof attending !== "boolean") {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  try {
    await pool.query(
      "INSERT INTO rsvps (name, attending, guests, side, phone, note) VALUES ($1,$2,$3,$4,$5,$6)",
      [name, attending, attending ? guests : 0, side, phone, note],
    );
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "db" }, { status: 500 });
  }
}
