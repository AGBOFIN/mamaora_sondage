# MAMAORA - Sondage pour les mamans togolaises

Une application web interactive pour collecter les besoins et les expériences des mamans togolaises dans le cadre du projet MAMAORA.

## 🎯 Objectif

Ce sondage vise à comprendre :
- Comment les mamans entrepreneures trouvent leurs clientes
- Les difficultés qu'elles rencontrent au quotidien
- Leur intérêt pour partager et écouter des histoires de mamans
- Leur volonté d'apparaître dans un annuaire de mamans entrepreneures

## 🚀 Installation

Aucune installation requise. Le projet est un fichier HTML autonome.

### Option 1 : Ouvrir directement
Ouvrez simplement le fichier `mamaora.html` dans votre navigateur.

### Option 2 : Serveur local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Python 2
python -m SimpleHTTPServer 8000

# Avec Node.js (si vous avez http-server installé)
npx http-server
```

Puis ouvrez `http://localhost:8000/mamaora.html` dans votre navigateur.

## 📱 Fonctionnalités

### Pour les participantes
- **5 catégories de questions** : Vous, Vos clientes, Vos histoires, Être trouvée, Contact
- **Interface responsive** : Fonctionne sur mobile et desktop
- **Sauvegarde automatique** : Les réponses sont sauvegardées localement (localStorage)
- **Navigation intuitive** : Étape par étape avec animations
- **Validation** : Vérification des champs obligatoires
- **Envoi sécurisé** : Les réponses sont stockées dans une base de données sécurisée
- **Redirection automatique** : Après l'envoi, l'utilisateur est redirigé vers la page de remerciement

### Pour les administrateurs
- **Espace admin sécurisé** : Accès protégé par code d'accès
- **Tableau de bord** : Vue d'ensemble des statistiques
- **Gestion des réponses** : Consultation, recherche, filtrage
- **Export CSV** : Export des données pour analyse
- **Suppression sécurisée** : Suppression avec confirmation

## 🎨 Design

- Palette de couleurs vibrante et chaleureuse
- Animations fluides
- Mode sombre automatique selon les préférences système
- Accessibilité (ARIA labels, navigation clavier)

## 📦 Structure du projet

```
MAMAORA/
├── mamaora.html          # Page principale - Formulaire de sondage
├── index.html            # Page de remerciement affichée après l'envoi
├── admin.html            # Page de connexion administrateur
├── dashboard.html        # Tableau de bord administrateur
├── api/
│   ├── submit.js         # Endpoint API pour soumettre les réponses
│   ├── auth.js           # Endpoint API pour l'authentification
│   ├── responses.js      # Endpoint API pour récupérer les réponses
│   └── delete.js         # Endpoint API pour supprimer une réponse
├── vercel.json           # Configuration Vercel
├── package.json          # Dépendances Node.js
├── supabase-setup.sql    # Script de configuration Supabase
├── ADMIN_SETUP.md        # Guide de configuration admin
└── README.md             # Documentation
```

## 🔧 Configuration

### Pour le déploiement initial

Consultez le fichier `ADMIN_SETUP.md` pour configurer :
- Supabase (base de données)
- Vercel (variables d'environnement)
- L'espace administrateur

### Variables d'environnement requises

- `SUPABASE_URL` : URL de votre projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : Clé service role de Supabase
- `ADMIN_CODE` : Code d'accès pour l'espace admin

## 🤝 Contribution

Ce projet est actuellement en phase de collecte de données. Les retours et suggestions sont les bienvenus.

## 📄 Licence

Propriété de MAMAORA, Togo.

## 📞 Contact

Pour toute question concernant ce sondage, contactez l'équipe MAMAORA.
