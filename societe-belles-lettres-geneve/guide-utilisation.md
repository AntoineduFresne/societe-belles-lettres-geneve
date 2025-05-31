# Guide d'utilisation du template - Société de Belles-Lettres Genève

Ce document vous explique comment personnaliser et utiliser le template du site web de la Société de Belles-Lettres Genève.

## Structure des fichiers

Le template est organisé comme suit :

```
societe-belles-lettres-geneve/
├── css/                      # Feuilles de style
│   ├── style.css             # Styles principaux
│   ├── responsive.css        # Styles pour l'affichage responsive
│   └── animations.css        # Animations et effets
├── js/                       # Scripts JavaScript
│   ├── main.js               # Script principal
│   └── slider.js             # Script pour la galerie/slider
├── images/                   # Dossier pour les images
│   ├── logo/                 # Logos de la société
│   ├── background/           # Images de fond
│   ├── gallery/              # Images pour la galerie photos
│   └── icons/                # Icônes diverses
├── fonts/                    # Polices personnalisées (si nécessaire)
├── index.html                # Page d'accueil
├── histoire.html             # Page Histoire
├── presentation.html         # Page Présentation
├── valeurs.html              # Page Valeurs
├── archives.html             # Page Archives
├── photos.html               # Page Photos
└── contact.html              # Page Contact
```

## Comment personnaliser le template

### 1. Remplacer le logo

1. Préparez deux versions de votre logo :
   - Version standard pour l'en-tête : à placer dans `images/logo/logo-belles-lettres-geneve.png`
   - Version blanche pour le pied de page : à placer dans `images/logo/logo-belles-lettres-geneve-white.png`

2. Assurez-vous que les logos sont de bonne qualité et de taille appropriée (hauteur recommandée : 60-80px).

### 2. Modifier les images de fond

1. Préparez des images de fond pour chaque page :
   - Page d'accueil : `images/background/hero-background.jpg`
   - Page Histoire : `images/background/histoire-background.jpg`
   - Page Présentation : `images/background/presentation-background.jpg`
   - Page Valeurs : `images/background/valeurs-background.jpg`
   - Page Archives : `images/background/archives-background.jpg`
   - Page Photos : `images/background/photos-background.jpg`
   - Page Contact : `images/background/contact-background.jpg`

2. Utilisez des images de haute qualité, de préférence en format paysage et d'une largeur minimale de 1920px.

### 3. Personnaliser les couleurs

Les couleurs principales sont définies comme variables CSS dans le fichier `css/style.css` :

```css
:root {
  --primary-color: #1a2639;     /* Couleur principale */
  --secondary-color: #c70025;   /* Couleur secondaire/accent */
  --accent-color: #f0f0f0;      /* Couleur d'accent légère */
  --text-color: #333333;        /* Couleur du texte principal */
  --light-text: #ffffff;        /* Couleur du texte clair */
  --dark-text: #1a1a1a;         /* Couleur du texte foncé */
  --background-light: #ffffff;  /* Couleur de fond claire */
  --background-dark: #1a2639;   /* Couleur de fond foncée */
}
```

Modifiez ces valeurs pour adapter les couleurs à votre charte graphique.

### 4. Modifier le contenu textuel

1. Remplacez tous les textes placeholders par vos propres contenus :
   - Remplacez `[ANNÉE]` par l'année de fondation de la société
   - Remplacez `[DEVISE]` par la devise de la société
   - Complétez les descriptions, les informations de contact, etc.

2. Pour chaque page HTML, modifiez :
   - Le titre principal (`<h1>`)
   - Les sous-titres (`<h2>`, `<h3>`)
   - Les paragraphes (`<p>`)
   - Les liens (`<a href="...">`)

### 5. Personnaliser la galerie photos

1. Placez vos photos dans le dossier `images/gallery/`
2. Modifiez les références dans le fichier `photos.html` :

```html
<div class="gallery-item">
    <img src="images/gallery/votre-image.jpg" alt="Description de l'image" class="gallery-image">
    <div class="gallery-overlay">
        <h3 class="gallery-title">Titre de l'image</h3>
    </div>
</div>
```

### 6. Configurer les liens vers les réseaux sociaux

Modifiez les liens des réseaux sociaux dans le pied de page de chaque fichier HTML :

```html
<div class="social-links">
    <a href="https://www.facebook.com/votre-page" class="social-link" target="_blank" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
    </a>
    <a href="https://www.instagram.com/votre-compte" class="social-link" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
    <!-- Autres réseaux sociaux -->
</div>
```

### 7. Personnaliser le formulaire de contact

Le formulaire de contact dans `contact.html` doit être configuré pour fonctionner avec votre système de traitement de formulaires. Vous devrez modifier l'attribut `action` du formulaire :

```html
<form action="votre-script-de-traitement.php" method="post" id="contactForm">
```

## Conseils pour le déploiement

1. **Hébergement** : Téléchargez tous les fichiers sur votre serveur web via FTP ou le gestionnaire de fichiers de votre hébergeur.

2. **Domaine** : Configurez votre nom de domaine pour pointer vers le dossier où vous avez téléchargé les fichiers.

3. **Optimisation** :
   - Compressez les images pour améliorer les temps de chargement
   - Minifiez les fichiers CSS et JavaScript pour la production

4. **Test** : Testez le site sur différents navigateurs et appareils pour vous assurer qu'il s'affiche correctement partout.

## Ressources supplémentaires

- Polices utilisées : Playfair Display et Montserrat (via Google Fonts)
- Icônes : Font Awesome 6.0.0
- Pour ajouter des fonctionnalités avancées, consultez un développeur web

## Support

Si vous avez des questions ou besoin d'aide pour personnaliser davantage ce template, n'hésitez pas à nous contacter.
