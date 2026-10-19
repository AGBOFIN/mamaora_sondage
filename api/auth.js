// Vercel Function pour l'authentification admin
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_CODE = process.env.ADMIN_CODE;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code required' });
    }

    // Vérifier le code admin avec trim
    if (code.trim() !== ADMIN_CODE.trim()) {
      return res.status(401).json({ error: 'Invalid code' });
    }

    // Créer un token de session simple (expirera dans 24h)
    const token = Buffer.from(`${Date.now()}-${code}`).toString('base64');

    // Optionnel: stocker dans Supabase pour plus de sécurité
    const { error } = await supabase
      .from('admin_sessions')
      .insert({
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });

    if (error) {
      console.error('Session error:', error);
    }

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
