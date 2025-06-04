# Société de Belles-Lettres Genève - Site Web

## Présentation

Ce projet est un site web complet pour la Société de Belles-Lettres Genève, développé avec Flask. Il offre une présentation élégante de la société, avec des sections dédiées à son histoire, ses valeurs, et ses activités, ainsi qu'un système de gestion de contenu pour les publications, événements et photos.

## Fonctionnalités

- **Design responsive** adapté à tous les appareils
- **Sections complètes** : Accueil, Histoire, Archives, Photos, Présentation, Valeurs, Contact, Nouvelle Revue
- **Système d'authentification** avec code d'accès (28012003)
- **Upload sécurisé** de textes pour la Nouvelle Revue
- **Galerie d'images dynamique** avec gestion d'albums
- **Calendrier d'événements** interactif
- **Panneau d'administration** pour la gestion des contenus
- **Intégration des réseaux sociaux**

## Installation

1. Clonez ce dépôt
2. Créez un environnement virtuel Python :
   ```
   python -m venv venv
   ```
3. Activez l'environnement virtuel :
   - Windows : `venv\Scripts\activate`
   - Unix/MacOS : `source venv/bin/activate`
4. Installez les dépendances :
   ```
   pip install -r requirements.txt
   ```
5. Configurez la base de données dans `src/main.py` si nécessaire
6. Initialisez la base de données :
   ```python
   from src.main import app, db
   with app.app_context():
       db.create_all()
   ```
7. Lancez l'application :
   ```
   python src/main.py
   ```
8. Accédez au site à l'adresse : http://localhost:5000

## Structure du projet

```
belles-lettres-app/
├── src/                  # Code source principal
│   ├── models/           # Modèles de données
│   ├── routes/           # Routes Flask (contrôleurs)
│   ├── static/           # Fichiers statiques (CSS, JS, images)
│   ├── templates/        # Templates HTML
│   └── main.py           # Point d'entrée de l'application
└── requirements.txt      # Dépendances Python
```

## Personnalisation

- Modifiez les templates HTML dans `src/templates/` pour personnaliser le contenu
- Ajustez les styles dans `src/static/css/style.css`
- Ajoutez vos propres images dans `src/static/images/`
- Configurez les liens vers vos réseaux sociaux dans les templates

## Administration

- Accédez au panneau d'administration via `/login`
- Utilisez le code d'accès : `28012003`
- Gérez les publications, événements et photos depuis le panneau d'administration

## Déploiement

Pour déployer sur un serveur de production :

1. Configurez un serveur web (Nginx, Apache) avec WSGI
2. Utilisez une base de données MySQL ou PostgreSQL
3. Configurez les variables d'environnement pour la production
4. Assurez-vous de modifier la clé secrète dans `src/main.py`

## Licence

Ce projet est fourni à titre d'exemple et peut être utilisé comme base pour votre propre site web.

## Support

Pour toute question ou assistance, veuillez contacter le développeur.
