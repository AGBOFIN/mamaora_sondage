// Vercel Function pour supprimer une réponse (admin only)
const supabase = require('./supabaseClient');
const { verifyToken } = require('./verifyToken');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
      console.error('Error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ error: `Failed to delete response: ${error.message}` });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
