# Guide de configuration de l'espace administrateur MAMAORA

Ce guide explique comment configurer et déployer l'espace administrateur pour le sondage MAMAORA.

## 📋 Vue d'ensemble

L'application utilise maintenant :
- **Supabase** pour la base de données et le stockage sécurisé des réponses
- **Vercel Functions** pour l'API backend
- **Session sécurisée** pour l'authentification admin

## 🚀 Étape 1 : Configuration Supabase

### 1.1 Créer un compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name**: `mamaora-survey`
   - **Database Password**: Choisissez un mot de passe fort (notez-le !)
   - **Region**: Choisissez la région la plus proche (ex: West Africa ou Europe)
5. Attendez que le projet soit créé (2-3 minutes)

### 1.2 Exécuter le script SQL

1. Dans votre dashboard Supabase, allez dans **SQL Editor**
2. Cliquez sur "New Query"
3. Copiez le contenu du fichier `supabase-setup.sql`
4. Collez-le dans l'éditeur
5. Cliquez sur "Run"

Ce script crée :
- La table `responses` pour stocker les réponses du sondage
- La table `admin_sessions` pour gérer les sessions admin
- Les politiques RLS (Row Level Security) pour sécuriser les données
- Les index pour optimiser les performances

### 1.3 Récupérer les clés API

1. Allez dans **Settings** → **API**
2. Notez les informations suivantes :
   - **Project URL** (ex: `https://xxxxxxxx.supabase.co`)
   - **anon public key** (pas besoin de celle-ci)
   - **service_role key** (C'EST CELLE DONT VOUS AVEZ BESOIN !)

⚠️ **IMPORTANT** : Ne partagez jamais la `service_role key`. Elle donne un accès complet à votre base de données.

## 🔐 Étape 2 : Configuration Vercel

### 2.1 Ajouter les variables d'environnement

1. Allez sur [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `mamaorasondage`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les variables suivantes :

| Nom | Valeur | Environnement |
|-----|--------|---------------|
| `SUPABASE_URL` | Votre Project URL Supabase | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Votre service_role key Supabase | Production, Preview, Development |
| `ADMIN_CODE` | Votre code d'accès admin (ex: `MAMAORA2024!`) | Production, Preview, Development |

⚠️ **IMPORTANT** :
- Le `ADMIN_CODE` doit être secret et complexe
- Ne le communiquez pas publiquement
- Changez-le régulièrement

### 2.2 Installer les dépendances

Le fichier `package.json` a été créé avec la dépendance Supabase. Vercel l'installera automatiquement lors du déploiement.

Si vous voulez tester localement :

```bash
npm install
```

## 📦 Étape 3 : Déploiement

### 3.1 Pusher les modifications sur GitHub

Les fichiers suivants ont été ajoutés/modifiés :

**Nouveaux fichiers :**
- `api/submit.js` - Endpoint pour soumettre les réponses
- `api/auth.js` - Endpoint pour l'authentification admin
- `api/responses.js` - Endpoint pour récupérer les réponses
- `api/delete.js` - Endpoint pour supprimer une réponse
- `admin.html` - Page de connexion admin
- `dashboard.html` - Tableau de bord admin
- `package.json` - Dépendances Node.js
- `supabase-setup.sql` - Script de configuration Supabase
- `ADMIN_SETUP.md` - Ce fichier

**Fichiers modifiés :**
- `mamaora.html` - Formulaire modifié pour envoyer à l'API au lieu de WhatsApp
- `vercel.json` - Configuration Vercel mise à jour

### 3.2 Déployer sur Vercel

1. Pushez les modifications sur GitHub :
```bash
git add .
git commit -m "Add admin dashboard with Supabase backend"
git push
```

2. Vercel détectera automatiquement les changements et redéployera
3. Allez dans votre dashboard Vercel et vérifiez que le déploiement est réussi

## 🧪 Étape 4 : Tester

### 4.1 Tester le formulaire public

1. Allez sur `https://mamaorasondage.vercel.app`
2. Remplissez le formulaire de sondage
3. Cliquez sur "Envoyer"
4. Vérifiez que le message de succès s'affiche

### 4.2 Tester l'accès admin

1. Allez sur `https://mamaorasondage.vercel.app/admin.html`
2. Entrez votre code d'accès admin (celui configuré dans `ADMIN_CODE`)
3. Vous devriez être redirigé vers le tableau de bord

### 4.3 Tester le tableau de bord

1. Vérifiez que les statistiques s'affichent
2. Vérifiez que la réponse soumise apparaît dans la liste
3. Cliquez sur "Voir" pour voir les détails
4. Testez la recherche et les filtres
5. Testez l'export CSV

## 🔧 Maintenance

### Changer le code d'accès admin

1. Allez dans Vercel → Settings → Environment Variables
2. Modifiez la variable `ADMIN_CODE`
3. Redéployez (Vercel vous le demandera)
4. Toutes les sessions existantes seront invalidées

### Nettoyer les anciennes sessions

Le script SQL inclut un nettoyage automatique. Si vous voulez le faire manuellement :

```sql
DELETE FROM admin_sessions WHERE expires_at < NOW();
```

### Sauvegarder les données

Supabase sauvegarde automatiquement votre base de données. Pour exporter :

1. Allez dans Supabase → Database → Backups
2. Cliquez sur "Create new backup"
3. Ou utilisez l'export SQL dans le SQL Editor

## 📊 Structure de la base de données

### Table `responses`

| Colonne | Type | Description |
|---------|------|-------------|
| id | BIGSERIAL | ID unique (auto) |
| ville | TEXT | Ville/quartier |
| age | TEXT | Tranche d'âge |
| situation | TEXT | Situation actuelle |
| activite | TEXT | Type d'activité |
| canaux | JSONB | Canaux de découverte (array) |
| derniere | TEXT | Dernière cliente |
| diff | JSONB | Difficultés (array) |
| paye | TEXT | A payé pour visibilité |
| paye_detail | TEXT | Détails du paiement |
| regarder | TEXT | Regarderait des interviews |
| raconter | TEXT | Accepte de raconter |
| sujets | TEXT | Sujets souhaités |
| annuaire | TEXT | Veut apparaître dans l'annuaire |
| prix | TEXT | Peut payer par mois |
| libre | TEXT | Mot libre |
| prenom | TEXT | Prénom |
| tel | TEXT | Numéro WhatsApp |
| created_at | TIMESTAMP | Date de soumission |

### Table `admin_sessions`

| Colonne | Type | Description |
|---------|------|-------------|
| id | BIGSERIAL | ID unique (auto) |
| token | TEXT | Token de session |
| expires_at | TIMESTAMP | Date d'expiration |
| created_at | TIMESTAMP | Date de création |

## 🔒 Sécurité

### Ce qui est sécurisé :

✅ Le code d'accès admin n'est jamais exposé dans le code client
✅ Les variables d'environnement sont protégées sur Vercel
✅ Les politiques RLS Supabase limitent l'accès aux données
✅ Les sessions expirent après 24h
✅ L'authentification est vérifiée à chaque requête API

### Bonnes pratiques :

🔐 Changez régulièrement le code d'accès admin
🔐 Utilisez un mot de passe fort pour Supabase
🔐 Surveillez les logs Vercel pour les activités suspectes
🔐 Sauvegardez régulièrement vos données
🔐 Limitez l'accès admin aux personnes de confiance

## 🐛 Dépannage

### Erreur "Failed to save response"

- Vérifiez que les variables d'environnement sont correctement configurées
- Vérifiez que la table `responses` existe dans Supabase
- Vérifiez les logs Vercel pour plus de détails

### Erreur "Invalid token"

- La session a peut-être expiré (24h)
- Reconnectez-vous sur admin.html
- Vérifiez que `ADMIN_CODE` n'a pas changé

### Le tableau de bord ne se charge pas

- Vérifiez que vous êtes connecté
- Vérifiez les logs du navigateur (F12)
- Vérifiez que l'API responses.js fonctionne

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs Vercel
2. Vérifiez les logs Supabase
3. Consultez la documentation Supabase
4. Contactez l'équipe technique

---

**Note** : Conservez ce fichier en sécurité car il contient des informations sensibles sur la configuration de votre application.
