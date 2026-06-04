-- Esquema para Turso (libSQL / SQLite)
-- Una "familia" = una invitación (grupo). Los invitados individuales son una familia de 1.

CREATE TABLE IF NOT EXISTS families (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  code         TEXT NOT NULL UNIQUE,         -- slug único para el link, ej. "jostin-7f3a"
  label        TEXT NOT NULL,                -- etiqueta del grupo (col "Familia" o nombre del invitado solo)
  mesa         TEXT,                         -- número de mesa
  responded_at TEXT                          -- ISO timestamp del envío del RSVP (NULL = pendiente)
);

CREATE TABLE IF NOT EXISTS guests (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  family_id    INTEGER NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  nombre       TEXT NOT NULL,
  apellido     TEXT,
  rol          TEXT,                          -- relative, friend, close-friend, etc.
  -- 'pendiente' | 'ambos' | 'ceremonia' | 'recepcion' | 'ninguno'
  attendance   TEXT NOT NULL DEFAULT 'pendiente',
  responded_at TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  family_id  INTEGER NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_guests_family ON guests(family_id);
CREATE INDEX IF NOT EXISTS idx_families_code ON families(code);
