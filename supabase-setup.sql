-- Setup SQL pour Supabase
-- Exécutez ce script dans le SQL Editor de Supabase

-- Table pour stocker les réponses du sondage
CREATE TABLE IF NOT EXISTS responses (
  id BIGSERIAL PRIMARY KEY,
  ville TEXT,
  age TEXT,
  situation TEXT,
  activite TEXT,
  canaux JSONB,
  derniere TEXT,
  diff JSONB,
  paye TEXT,
  paye_detail TEXT,
  regarder TEXT,
  raconter TEXT,
  sujets TEXT,
  annuaire TEXT,
  prix TEXT,
  libre TEXT,
  prenom TEXT,
  tel TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les sessions admin
CREATE TABLE IF NOT EXISTS admin_sessions (
  id BIGSERIAL PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Politiques pour responses (lecture seule via API)
CREATE POLICY "Public insert responses" ON responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public select responses via service role" ON responses
  FOR SELECT USING (auth.role() = 'service_role');

-- Politiques pour admin_sessions
CREATE POLICY "Service role all on admin_sessions" ON admin_sessions
  FOR ALL USING (auth.role() = 'service_role');

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Nettoyage automatique des sessions expirées (optionnel)
-- Vous pouvez créer une fonction pg_cron si nécessaire
