// Vercel Function pour supprimer une réponse (admin only)
const { createClient } = require('@supabase/supabase-js');
const { verifyToken } = require('./verifyToken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }

    // Vérifier le token JWT depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const decoded = verifyToken(authHeader);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Supprimer la réponse
    const { error } = await supabase
      .from('responses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting response:', error);
      return res.status(500).json({ error: `Failed to delete response: ${error.message}` });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
