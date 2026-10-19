// Vercel Function pour soumettre les réponses du sondage
const supabase = require('./supabaseClient');

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

  // Seulement POST autorisé
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    console.log('Received data:', JSON.stringify(data));
    console.log('Table name:', 'responses');

    // Validation basique
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Insérer dans Supabase
    const { error } = await supabase
      .from('responses')
      .insert({
        ville: data.ville || null,
        age: data.age || null,
        situation: data.situation || null,
        activite: data.activite || null,
        canaux: data.canaux ? JSON.stringify(data.canaux) : null,
        derniere: data.derniere || null,
        diff: data.diff ? JSON.stringify(data.diff) : null,
        paye: data.paye || null,
        paye_detail: data.paye_detail || null,
        regarder: data.regarder || null,
        raconter: data.raconter || null,
        sujets: data.sujets || null,
        annuaire: data.annuaire || null,
        prix: data.prix || null,
        libre: data.libre || null,
        prenom: data.prenom || null,
        tel: data.tel || null,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', JSON.stringify(error.details, null, 2));
      return res.status(500).json({ error: `Failed to save response: ${error.message}` });
    }

    console.log('Response saved successfully');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
}
