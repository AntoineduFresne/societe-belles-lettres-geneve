// Société de Belles-Lettres Genève
// Script pour le slider/galerie

document.addEventListener('DOMContentLoaded', function() {
    // Configuration du slider
    const sliderConfig = {
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: true,
        fade: true,
        pauseOnHover: true
    };
    
    // Initialisation du slider (à adapter selon la bibliothèque utilisée)
    function initSlider() {
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            // Code pour initialiser le slider
            // Exemple avec une bibliothèque comme Slick ou Swiper
            // $(slider).slick(sliderConfig);
        }
    }
    
    // Initialisation de la galerie lightbox
    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');
                
                // Création de la lightbox
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                
                const lightboxContent = `
                    <div class="lightbox-content">
                        <button class="lightbox-close">&times;</button>
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <div class="lightbox-caption">${imgAlt}</div>
                    </div>
                `;
                
                lightbox.innerHTML = lightboxContent;
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Animation d'ouverture
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                
                // Fermeture de la lightbox
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', closeLightbox);
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    }
    
    // Filtrage de la galerie
    function initGalleryFilter() {
        const filterButtons = document.querySelectorAll('.gallery-filter button');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (filterButtons.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Retirer la classe active de tous les boutons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Ajouter la classe active au bouton cliqué
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Filtrer les éléments de la galerie
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.classList.contains(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }
    }
    
    // Initialiser les fonctionnalités
    initSlider();
    initGallery();
    initGalleryFilter();
});
