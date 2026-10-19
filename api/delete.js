// Vercel Function pour supprimer une réponse (admin only)
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, id } = req.query;

    if (!token || !id) {
      return res.status(400).json({ error: 'Token and ID required' });
    }

    // Vérifier le token
    const { data: session, error: sessionError } = await supabase
      .from('admin_sessions')
      .select('*')
      .eq('token', token)
      .single();

    if (sessionError || !session) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Vérifier l'expiration
    if (new Date(session.expires_at) < new Date()) {
      await supabase.from('admin_sessions').delete().eq('token', token);
      return res.status(401).json({ error: 'Token expired' });
    }

    // Supprimer la réponse
    const { error } = await supabase
      .from('responses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting response:', error);
      return res.status(500).json({ error: 'Failed to delete response' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
