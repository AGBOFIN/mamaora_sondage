// Utilitaire pour créer un client Supabase avec URL normalisée
const { createClient } = require('@supabase/supabase-js');

function normalizeSupabaseUrl(url) {
  if (!url) return url;
  let normalized = url.trim();

  // Logger pour debug (sans secret)
  console.log('Original SUPABASE_URL:', normalized);

  // Supprimer /rest/v1 s'il existe (le client l'ajoutera automatiquement)
  // Doit être fait AVANT de supprimer le slash final
  normalized = normalized.replace(/\/rest\/v1\/?$/, '');

  // Supprimer le slash final s'il reste
  normalized = normalized.replace(/\/$/, '');

  console.log('Normalized SUPABASE_URL:', normalized);

  return normalized;
}

const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

module.exports = createClient(supabaseUrl, supabaseKey);
