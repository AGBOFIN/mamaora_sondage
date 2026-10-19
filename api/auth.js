// Vercel Function pour l'authentification admin avec JWT
const jwt = require('jsonwebtoken');

const ADMIN_CODE = process.env.ADMIN_CODE;
const JWT_SECRET = process.env.JWT_SECRET || ADMIN_CODE;

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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

    // Créer un token JWT valide 8 heures
    const token = jwt.sign(
      { authenticated: true, timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
