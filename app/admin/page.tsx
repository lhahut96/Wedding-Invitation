"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Rsvp = {
  id: number;
  name: string;
  attending: boolean;
  guests: number;
  side: "bride" | "groom" | null;
  phone: string | null;
  note: string | null;
  created_at: string;
};
type Wish = { id: number; name: string; message: string; created_at: string };

const KEY = "admin-token";
const fmt = (d: string) =>
  new Date(d).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", dateStyle: "short", timeStyle: "short" });
const sideLabel = (s: Rsvp["side"]) => (s === "bride" ? "Nhà gái" : s === "groom" ? "Nhà trai" : "—");

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState<{ rsvps: Rsvp[]; wishes: Wish[] } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");
  const [tab, setTab] = useState<"rsvps" | "wishes">("rsvps");

  const load = useCallback(async (t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", { headers: { Authorization: `Bearer ${t}` }, cache: "no-store" });
      if (res.status === 401) throw new Error("Sai mã truy cập.");
      if (!res.ok) throw new Error("Không tải được dữ liệu.");
      setData(await res.json());
      setToken(t);
      try {
        sessionStorage.setItem(KEY, t);
      } catch {}
    } catch (e) {
      setData(null);
      setToken("");
      try {
        sessionStorage.removeItem(KEY);
      } catch {}
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore the token for this browser tab only (sessionStorage is cleared when the tab closes).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved) load(saved);
    } catch {}
  }, [load]);

  const stats = useMemo(() => {
    const r = data?.rsvps ?? [];
    const yes = r.filter((x) => x.attending);
    const sum = (rows: Rsvp[]) => rows.reduce((n, x) => n + x.guests, 0);
    return {
      responses: r.length,
      yes: yes.length,
      no: r.length - yes.length,
      guests: sum(yes),
      bride: sum(yes.filter((x) => x.side === "bride")),
      groom: sum(yes.filter((x) => x.side === "groom")),
    };
  }, [data]);

  const rows = useMemo(
    () => (data?.rsvps ?? []).filter((x) => (filter === "all" ? true : filter === "yes" ? x.attending : !x.attending)),
    [data, filter],
  );

  async function download(type: "rsvps" | "wishes") {
    const res = await fetch(`/api/export?type=${type}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return setError("Không tải được file.");
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function logout() {
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
    setToken("");
    setData(null);
    setInput("");
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-ink">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input) load(input);
          }}
          className="w-full max-w-sm space-y-4"
        >
          <h1 className="font-display text-4xl italic">Admin</h1>
          <p className="text-sm text-ink/60">Nhập mã truy cập để xem danh sách khách.</p>
          <input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mã truy cập"
            className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 outline-none focus:border-wine"
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            disabled={loading || !input}
            className="w-full cursor-pointer rounded-lg bg-ink px-4 py-3 text-cream transition hover:bg-wine disabled:opacity-50"
          >
            {loading ? "Đang kiểm tra..." : "Đăng nhập"}
          </button>
        </form>
      </main>
    );
  }

  const stat = (label: string, value: number | string) => (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{label}</p>
      <p className="mt-1 font-display text-3xl">{value}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-ink md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-4xl italic">Danh sách khách</h1>
          <div className="flex gap-2 text-sm">
            <button onClick={() => load(token)} className="cursor-pointer rounded-full border border-ink/30 px-4 py-2 hover:bg-ink hover:text-cream">
              {loading ? "Đang tải..." : "Làm mới"}
            </button>
            <button onClick={logout} className="cursor-pointer rounded-full border border-ink/30 px-4 py-2 hover:bg-ink hover:text-cream">
              Đăng xuất
            </button>
          </div>
        </header>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stat("Phản hồi", stats.responses)}
          {stat("Tham dự", stats.yes)}
          {stat("Không đến", stats.no)}
          {stat("Tổng số khách", stats.guests)}
          {stat("Nhà gái", stats.bride)}
          {stat("Nhà trai", stats.groom)}
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          {(["rsvps", "wishes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cursor-pointer rounded-full px-4 py-2 ${tab === t ? "bg-ink text-cream" : "border border-ink/30"}`}
            >
              {t === "rsvps" ? `Xác nhận (${data.rsvps.length})` : `Lời chúc (${data.wishes.length})`}
            </button>
          ))}
          <button onClick={() => download(tab)} className="ml-auto cursor-pointer rounded-full border border-ink/30 px-4 py-2 hover:bg-ink hover:text-cream">
            Tải CSV
          </button>
        </div>

        {tab === "rsvps" ? (
          <>
            <div className="mt-4 flex gap-2 text-xs">
              {([["all", "Tất cả"], ["yes", "Tham dự"], ["no", "Không đến"]] as const).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`cursor-pointer rounded-full px-3 py-1 ${filter === k ? "bg-wine text-cream" : "border border-ink/20"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-3 overflow-x-auto rounded-xl bg-white shadow-sm">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/50">
                  <tr>
                    {["Họ tên", "Tham dự", "Số người", "Bên", "Điện thoại", "Ghi chú", "Thời gian"].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-ink/5 align-top last:border-0">
                      <td className="px-4 py-3 font-semibold">{r.name}</td>
                      <td className="px-4 py-3">{r.attending ? "✅ Có" : "❌ Không"}</td>
                      <td className="px-4 py-3">{r.guests}</td>
                      <td className="px-4 py-3">{sideLabel(r.side)}</td>
                      <td className="px-4 py-3">{r.phone ?? "—"}</td>
                      <td className="max-w-xs px-4 py-3 text-ink/70">{r.note ?? "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-ink/60">{fmt(r.created_at)}</td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-ink/50">Chưa có phản hồi nào.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <ul className="mt-4 space-y-3">
            {data.wishes.map((w) => (
              <li key={w.id} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold">{w.name}</p>
                  <p className="text-xs text-ink/50">{fmt(w.created_at)}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-ink/80">{w.message}</p>
              </li>
            ))}
            {data.wishes.length === 0 && <li className="py-8 text-center text-ink/50">Chưa có lời chúc nào.</li>}
          </ul>
        )}
      </div>
    </main>
  );
}
