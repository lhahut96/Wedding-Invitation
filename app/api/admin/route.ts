import { createHash, timingSafeEqual } from "node:crypto";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

const digest = (s: string) => createHash("sha256").update(s).digest();

// GET /api/admin  with header  Authorization: Bearer <ADMIN_TOKEN>
// Returns every RSVP and wish for the /admin page. The token is only accepted in the header
// (never in the URL) so it does not end up in logs or browser history.
export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  const given = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!token || !timingSafeEqual(digest(given), digest(token))) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return new Response("Unauthorized", { status: 401 });
  }

  const [rsvps, wishes] = await Promise.all([
    pool.query("SELECT id, name, attending, guests, side, phone, note, created_at FROM rsvps ORDER BY created_at DESC"),
    pool.query("SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC"),
  ]);
  return Response.json({ rsvps: rsvps.rows, wishes: wishes.rows }, { headers: { "Cache-Control": "no-store" } });
}
