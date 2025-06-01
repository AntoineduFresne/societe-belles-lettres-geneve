// Société de Belles-Lettres Genève
// Script principal

document.addEventListener('DOMContentLoaded', function() {
    // Navigation responsive
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Header au défilement
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animation au défilement
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Vérifier les éléments au chargement
    checkScroll();
    
    // Vérifier les éléments au défilement
    window.addEventListener('scroll', checkScroll);
    
    // Galerie lightbox (à personnaliser)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Code pour ouvrir la lightbox
            // À personnaliser selon les besoins
        });
    });
    
    // Validation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Ici, vous pouvez ajouter le code pour envoyer le formulaire
                // Par exemple, avec fetch() ou FormData
                alert('Formulaire envoyé avec succès!');
                contactForm.reset();
            } else {
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
});
