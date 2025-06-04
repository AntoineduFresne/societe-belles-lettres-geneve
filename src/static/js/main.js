// Fonctions JavaScript principales pour le site
document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = 1;
            }
        });
    };
    
    // Initialisation des animations au chargement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi du formulaire
            // ... envoie AJAX ici ...
            // En cas d'erreur :
            showToast('Erreur lors de l\'envoi du message.', 'danger');
            // En cas de succès :
            showToast('Votre message a été envoyé avec succès !', 'success');
            contactForm.reset();
        });
    }
    
    // Gestion du formulaire d'upload pour la Nouvelle Revue
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            const accessCode = document.getElementById('accessCode').value;
            
            // Vérification du code d'accès
            if (accessCode !== '28012003') {
                alert('Code d\'accès incorrect. Veuillez réessayer main js.');
                return;
            }
            
            // Simulation d'upload réussi
            alert('Votre texte a été soumis avec succès !');
            uploadForm.reset();
        });
    }
    
    // Gestion de la galerie photos
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Ici, vous pourriez implémenter une lightbox pour afficher l'image en grand
                console.log('Image cliquée:', this.querySelector('img').src);
            });
        });
    }
    
    // Gestion du menu mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.querySelector('.navbar-collapse').classList.toggle('show');
        });
    }
});
<form id="uploadForm" method="POST" enctype="multipart/form-data">
    <!-- ... -->
</form>
