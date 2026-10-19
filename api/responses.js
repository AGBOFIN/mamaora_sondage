// Vercel Function pour récupérer les réponses (admin only)
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
      console.error('Error details:', JSON.stringify(error, null, 2));
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
