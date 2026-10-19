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

-- Activer Row Level Security
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Politiques pour responses (lecture seule via API)
CREATE POLICY "Public insert responses" ON responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public select responses via service role" ON responses
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role delete responses" ON responses
  FOR DELETE USING (auth.role() = 'service_role');

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses(created_at DESC);

-- Nettoyer l'ancienne table admin_sessions si elle existe (migration)
DROP TABLE IF EXISTS admin_sessions CASCADE;
