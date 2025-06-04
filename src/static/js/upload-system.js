// Script pour gérer l'upload de textes avec authentification
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.querySelector('.upload-form form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            const authCode = document.getElementById('auth_code').value;
            const fileInput = document.getElementById('file');
            
            // Vérification du code d'authentification côté client (sécurité supplémentaire)
            // Note: La vérification principale se fait côté serveur
            if (authCode.trim() === '') {
                e.preventDefault();
                alert('Veuillez entrer le code d\'authentification.');
                return false;
            }
            
            // Vérification du fichier
            if (fileInput.files.length === 0) {
                e.preventDefault();
                alert('Veuillez sélectionner un fichier PDF.');
                return false;
            }
            
            // Vérification de l'extension du fichier
            const fileName = fileInput.files[0].name;
            const fileExt = fileName.split('.').pop().toLowerCase();
            
            if (fileExt !== 'pdf') {
                e.preventDefault();
                alert('Seuls les fichiers PDF sont acceptés.');
                return false;
            }
            
            // Vérification de la taille du fichier (max 16 Mo)
            const maxSize = 16 * 1024 * 1024; // 16 Mo en octets
            if (fileInput.files[0].size > maxSize) {
                e.preventDefault();
                alert('La taille du fichier ne doit pas dépasser 16 Mo.');
                return false;
            }
        });
    }
});
