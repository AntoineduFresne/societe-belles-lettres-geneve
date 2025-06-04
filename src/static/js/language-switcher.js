// Système de changement de langue pour la Société de Belles-Lettres Genève

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du changement de langue
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageLinks = languageSwitcher.querySelectorAll('a');
    
    // Mettre à jour la langue active
    function updateActiveLanguage() {
        const currentLang = document.documentElement.lang;
        languageLinks.forEach(link => {
            if (link.getAttribute('href').includes(`lang=${currentLang}`)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Initialiser la langue active
    updateActiveLanguage();
    
    // Écouter les changements de langue
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // La redirection sera gérée par Flask
            // Nous n'avons pas besoin de code supplémentaire ici
        });
    });
});
