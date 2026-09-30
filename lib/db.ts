import { Pool } from "pg";

// Reuse one pool across hot reloads in dev.
const g = globalThis as unknown as { pgPool?: Pool };

export const pool = (g.pgPool ??= new Pool({ connectionString: process.env.DATABASE_URL }));
