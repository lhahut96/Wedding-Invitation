import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

const TABLES = {
  rsvps: {
    query: "SELECT id, name, attending, guests, side, phone, note, created_at FROM rsvps ORDER BY created_at",
    header: ["ID", "Họ tên", "Tham dự", "Số người", "Bên", "Điện thoại", "Ghi chú", "Thời gian"],
  },
  wishes: {
    query: "SELECT id, name, message, created_at FROM wishes ORDER BY created_at",
    header: ["ID", "Họ tên", "Lời chúc", "Thời gian"],
  },
} as const;

const cell = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  let s =
    v instanceof Date
      ? v.toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" })
      : typeof v === "boolean"
        ? v ? "Có" : "Không"
        : v === "bride" ? "Nhà gái" : v === "groom" ? "Nhà trai" : String(v);
  // Stop spreadsheet apps from running user text as a formula.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

// GET /api/export?type=rsvps|wishes  with header  Authorization: Bearer <ADMIN_TOKEN>
// (or ?token=<ADMIN_TOKEN> to download straight from the browser).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = process.env.ADMIN_TOKEN;
  const given = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? url.searchParams.get("token");
  if (!token || given !== token) return new Response("Unauthorized", { status: 401 });

  const type = (url.searchParams.get("type") ?? "rsvps") as keyof typeof TABLES;
  const t = TABLES[type];
  if (!t) return new Response("Bad type", { status: 400 });

  const { rows } = await pool.query(t.query);
  const lines = [t.header.map(cell), ...rows.map((r) => Object.values(r).map(cell))].map((l) => l.join(","));
  // UTF-8 BOM so Excel opens Vietnamese text correctly; CRLF line endings per RFC 4180.
  const body = "﻿" + lines.join("\r\n") + "\r\n";
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
