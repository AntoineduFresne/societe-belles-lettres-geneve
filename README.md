# Guide d'utilisation du site de la Société de Belles-Lettres Genève

## Introduction

Ce document présente le site web de la Société de Belles-Lettres Genève, développé avec Flask. Le site est multilingue (français, anglais, allemand, italien) et comprend toutes les sections demandées, ainsi qu'un système d'upload de textes sécurisé par code d'authentification.

## Structure du projet

```
belles-lettres-site/
├── src/                      # Code source principal
│   ├── main.py               # Point d'entrée de l'application Flask
│   ├── static/               # Fichiers statiques
│   │   ├── css/              # Feuilles de style
│   │   ├── js/               # Scripts JavaScript
│   │   ├── img/              # Images du site
│   │   └── uploads/          # Dossier pour les textes uploadés
│   └── templates/            # Templates HTML
│       ├── layout.html       # Template principal
│       ├── index.html        # Page d'accueil
│       ├── presentation.html # Présentation
│       ├── histoire.html     # Histoire
│       ├── valeurs.html      # Valeurs
│       ├── archives.html     # Archives
│       ├── photos.html       # Photos
│       ├── contact.html      # Contact
│       ├── revue.html        # La nouvelle revue de Belles-Lettres
│       ├── 404.html          # Page d'erreur 404
│       └── 500.html          # Page d'erreur 500
├── venv/                     # Environnement virtuel Python
└── requirements.txt          # Dépendances Python
```

## Fonctionnalités principales

1. **Site multilingue** : Le site est disponible en français (par défaut), anglais, allemand et italien.
2. **Navigation intuitive** : Menu principal avec toutes les sections demandées.
3. **Design responsive** : S'adapte à tous les appareils (desktop, tablette, mobile).
4. **Upload sécurisé** : Système d'upload de textes avec authentification par code.
5. **Formulaire de contact** : Pour permettre aux visiteurs de contacter la société.

## Installation et déploiement

### Prérequis

- Python 3.8 ou supérieur
- pip (gestionnaire de paquets Python)

### Installation locale

1. Clonez le dépôt ou décompressez l'archive dans un dossier de votre choix.
2. Créez un environnement virtuel Python :
   ```
   python -m venv venv
   ```
3. Activez l'environnement virtuel :
   - Sur Windows : `venv\Scripts\activate`
   - Sur macOS/Linux : `source venv/bin/activate`
4. Installez les dépendances :
   ```
   pip install -r requirements.txt
   ```
5. Lancez l'application :
   ```
   python src/main.py
   ```
6. Accédez au site dans votre navigateur à l'adresse : `http://localhost:5000`

### Déploiement sur un serveur

Pour déployer l'application sur un serveur de production, vous pouvez utiliser Gunicorn ou uWSGI avec Nginx. Voici un exemple de configuration avec Gunicorn :

1. Installez Gunicorn :
   ```
   pip install gunicorn
   ```
2. Lancez l'application avec Gunicorn :
   ```
   gunicorn -w 4 -b 0.0.0.0:8000 src.main:app
   ```
3. Configurez Nginx pour servir l'application (exemple de configuration) :
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.com;

       location / {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /static {
           alias /chemin/vers/belles-lettres-site/src/static;
       }
   }
   ```

## Personnalisation

### Contenu textuel

Pour personnaliser le contenu textuel du site, modifiez les fichiers HTML dans le dossier `src/templates/`. Les textes sont encapsulés dans des balises de traduction `{{ _('texte') }}` pour permettre la traduction.

### Images

1. Remplacez les images dans le dossier `src/static/img/` par vos propres images.
2. Assurez-vous de conserver les mêmes noms de fichiers ou mettez à jour les références dans les templates HTML.

### Styles

Les styles sont définis dans les fichiers CSS du dossier `src/static/css/`. Vous pouvez les modifier selon vos préférences.

### Code d'authentification

Le code d'authentification pour l'upload de textes est défini dans le fichier `src/main.py` :
```python
app.config['AUTH_CODE'] = '28012003'  # Code d'authentification pour l'upload
```
Vous pouvez le modifier selon vos besoins.

## Traductions

Le système de traduction utilise Flask-Babel. Pour ajouter ou modifier des traductions :

1. Extrayez les chaînes à traduire :
   ```
   pybabel extract -F babel.cfg -o messages.pot src/
   ```
2. Créez ou mettez à jour les fichiers de traduction :
   ```
   pybabel init -i messages.pot -d src/translations -l en  # Pour l'anglais
   pybabel init -i messages.pot -d src/translations -l de  # Pour l'allemand
   pybabel init -i messages.pot -d src/translations -l it  # Pour l'italien
   ```
3. Traduisez les chaînes dans les fichiers `.po` générés.
4. Compilez les traductions :
   ```
   pybabel compile -d src/translations
   ```

## Fonctionnalités à développer

Pour une version complète du site, vous pourriez envisager d'ajouter :

1. Une base de données pour stocker les métadonnées des textes uploadés.
2. Un système d'administration pour gérer les contenus.
3. Une galerie d'images dynamique.
4. Un calendrier d'événements.
5. Une intégration avec les réseaux sociaux.

## Support

Pour toute question ou assistance, n'hésitez pas à nous contacter.

---

© 2025 Société de Belles-Lettres Genève
