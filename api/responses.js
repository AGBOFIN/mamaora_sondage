// Vercel Function pour récupérer les réponses (admin only)
const { createClient } = require('@supabase/supabase-js');
const { verifyToken } = require('./verifyToken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérifier le token JWT depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    const decoded = verifyToken(authHeader);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Récupérer les réponses
    const { data: responses, error } = await supabase
      .from('responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching responses:', error);
      return res.status(500).json({ error: `Failed to fetch responses: ${error.message}` });
    }

    // Parser les JSON
    const parsedResponses = responses.map(r => ({
      ...r,
      canaux: r.canaux ? JSON.parse(r.canaux) : [],
      diff: r.diff ? JSON.parse(r.diff) : []
    }));

    return res.status(200).json({ responses: parsedResponses });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
