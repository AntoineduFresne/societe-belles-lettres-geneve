# Architecture du site internet pour la Société de Belles-Lettres Genève

## Structure générale

Le site sera organisé selon une architecture multilingue avec le français comme langue par défaut, et des versions en anglais, allemand et italien. La structure sera responsive pour s'adapter à tous les appareils.

## Structure des dossiers

```
belles-lettres-site/
├── index.html                  # Page d'accueil (redirige vers fr/index.html)
├── css/
│   ├── style.css               # Styles principaux
│   ├── responsive.css          # Styles pour la responsivité
│   └── fonts.css               # Définition des polices
├── js/
│   ├── main.js                 # Script principal
│   ├── language-switcher.js    # Gestion du changement de langue
│   └── upload-system.js        # Système d'upload de textes
├── img/
│   ├── logo.png                # Logo de la société
│   ├── background.jpg          # Image de fond
│   └── social/                 # Icônes des réseaux sociaux
├── uploads/                    # Dossier pour les textes uploadés
├── fr/                         # Version française (par défaut)
│   ├── index.html              # Accueil
│   ├── histoire.html           # Histoire
│   ├── archives.html           # Archives
│   ├── photos.html             # Photos
│   ├── contact.html            # Contact
│   ├── presentation.html       # Présentation
│   ├── valeurs.html            # Valeurs
│   └── revue.html              # La nouvelle revue de Belles Lettres
├── en/                         # Version anglaise
│   ├── index.html
│   └── ... (même structure que fr/)
├── de/                         # Version allemande
│   ├── index.html
│   └── ... (même structure que fr/)
└── it/                         # Version italienne
    ├── index.html
    └── ... (même structure que fr/)
```

## Navigation et sections

### En-tête (Header)
- Logo de la société
- Menu de navigation principal
- Sélecteur de langue (FR, EN, DE, IT)
- Liens vers les réseaux sociaux (Facebook, Instagram, etc.)

### Sections principales
1. **Accueil** - Présentation générale avec image de fond
2. **Présentation** - Description de la société
3. **Histoire** - Histoire de la société
4. **Valeurs** - Les valeurs de la société
5. **Archives** - Documents historiques
6. **Photos** - Galerie de photos
7. **La nouvelle revue de Belles Lettres** - Section pour les textes et essais
8. **Contact** - Formulaire de contact et informations

### Pied de page (Footer)
- Liens vers les réseaux sociaux
- Mention de la langue de genre utilisée (français)
- Copyright et mentions légales
- Liens rapides vers les sections principales

## Système multilingue

Le système de changement de langue sera implémenté via des redirections vers les sous-dossiers correspondants (fr/, en/, de/, it/). Chaque page aura son équivalent dans les quatre langues, avec le français comme langue par défaut.

## Système d'upload de textes

Un formulaire d'upload sera intégré dans la section "La nouvelle revue de Belles Lettres" avec:
- Champ pour le titre du texte
- Champ pour l'auteur
- Champ pour la description
- Sélecteur de fichier (format PDF)
- Champ pour le code d'authentification (initialement 28012003)
- Bouton d'envoi

Le système vérifiera le code d'authentification avant de permettre l'upload des fichiers.

## Responsive design

Le site sera conçu avec une approche "mobile-first" pour garantir une expérience utilisateur optimale sur tous les appareils:
- Adaptation du menu pour les petits écrans (menu hamburger)
- Images redimensionnées selon la taille de l'écran
- Mise en page fluide avec des unités relatives
- Media queries pour les différentes tailles d'écran
