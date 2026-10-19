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

- **5 catégories de questions** : Vous, Vos clientes, Vos histoires, Être trouvée, Contact
- **Interface responsive** : Fonctionne sur mobile et desktop
- **Sauvegarde automatique** : Les réponses sont sauvegardées localement (localStorage)
- **Navigation intuitive** : Étape par étape avec animations
- **Validation** : Vérification des champs obligatoires
- **Export WhatsApp** : Envoi direct des réponses via WhatsApp
- **Partage social** : Boutons pour partager sur WhatsApp et Facebook

## 🎨 Design

- Palette de couleurs vibrante et chaleureuse
- Animations fluides
- Mode sombre automatique selon les préférences système
- Accessibilité (ARIA labels, navigation clavier)

## 📦 Structure du projet

```
MAMAORA/
└── mamaora.html    # Fichier unique contenant HTML, CSS et JavaScript
```

## 🔧 Configuration

Le numéro WhatsApp de destination est configuré dans le JavaScript (ligne 260) :
```javascript
var WA_NUMBER = "22879060605";
```

## 🤝 Contribution

Ce projet est actuellement en phase de collecte de données. Les retours et suggestions sont les bienvenus.

## 📄 Licence

Propriété de MAMAORA, Togo.

## 📞 Contact

Pour toute question concernant ce sondage, contactez l'équipe MAMAORA.
