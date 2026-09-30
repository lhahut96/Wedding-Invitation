-- Runs once, when the db-data volume is first created.

CREATE TABLE IF NOT EXISTS rsvps (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  attending   BOOLEAN     NOT NULL,
  guests      SMALLINT    NOT NULL DEFAULT 1 CHECK (guests BETWEEN 0 AND 10),
  side        TEXT        CHECK (side IN ('bride', 'groom')),
  phone       TEXT,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wishes (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
