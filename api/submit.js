// Vercel Function pour soumettre les réponses du sondage
const { createClient } = require('@supabase/supabase-js');

// Initialiser le client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function handler(req, res) {
  // Seulement POST autorisé
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

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
      return res.status(500).json({ error: `Failed to save response: ${error.message}` });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
}
