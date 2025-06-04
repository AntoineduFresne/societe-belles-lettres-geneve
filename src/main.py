import os
import sys
from flask import Flask, render_template, request, redirect, url_for, g, flash, session, abort
from flask_babel import Babel, gettext as _
from werkzeug.utils import secure_filename
import datetime

# Configuration du chemin pour les imports
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Initialisation de l'application Flask
app = Flask(__name__)
app.secret_key = 'belles-lettres-geneve-secret-key'
app.config['UPLOAD_FOLDER'] = os.path.join(app.static_folder, 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limite à 16 Mo
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
app.config['AUTH_CODE'] = '28012003'  # Code d'authentification pour l'upload

# Configuration de Babel pour l'internationalisation
app.config['BABEL_DEFAULT_LOCALE'] = 'fr'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = os.path.join(os.path.dirname(__file__), 'translations')
babel = Babel(app)

# Langues disponibles
LANGUAGES = {
    'fr': 'Français',
    'en': 'English',
    'de': 'Deutsch',
    'it': 'Italiano'
}

# Fonction pour vérifier si un fichier a une extension autorisée
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Configuration de la langue pour chaque requête
@babel.localeselector
def get_locale():
    # Si la langue est spécifiée dans l'URL, l'utiliser
    lang = request.view_args.get('lang')
    if lang and lang in LANGUAGES:
        return lang
    # Sinon, utiliser le français par défaut
    return 'fr'

# Middleware pour définir la langue globale
@app.before_request
def before_request():
    g.lang = get_locale()
    g.languages = LANGUAGES
    g.current_year = datetime.datetime.now().year

# Route pour la redirection vers la langue par défaut
@app.route('/')
def root():
    return redirect(url_for('index', lang='fr'))

# Routes principales avec paramètre de langue
@app.route('/<lang>/')
def index(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('index', lang='fr'))
    return render_template('index.html')

@app.route('/<lang>/presentation')
def presentation(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('presentation', lang='fr'))
    return render_template('presentation.html')

@app.route('/<lang>/histoire')
def histoire(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('histoire', lang='fr'))
    return render_template('histoire.html')

@app.route('/<lang>/valeurs')
def valeurs(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('valeurs', lang='fr'))
    return render_template('valeurs.html')

@app.route('/<lang>/archives')
def archives(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('archives', lang='fr'))
    return render_template('archives.html')

@app.route('/<lang>/photos')
def photos(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('photos', lang='fr'))
    return render_template('photos.html')

@app.route('/<lang>/contact')
def contact(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('contact', lang='fr'))
    return render_template('contact.html')

@app.route('/<lang>/revue')
def revue(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('revue', lang='fr'))
    
    # Récupération des textes existants
    texts = []
    uploads_dir = app.config['UPLOAD_FOLDER']
    if os.path.exists(uploads_dir):
        # Ici, vous pourriez lire les métadonnées des textes depuis une base de données
        # Pour l'exemple, nous utilisons des données fictives
        texts = [
            {
                'title': 'Exemple de texte',
                'author': 'Jean Dupont',
                'date': '01.05.2025',
                'description': 'Un exemple de texte pour illustrer la revue.',
                'filename': 'exemple.pdf'
            }
        ]
    
    return render_template('revue.html', texts=texts)

# Traitement du formulaire de contact
@app.route('/<lang>/contact/submit', methods=['POST'])
def contact_submit(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('contact', lang='fr'))
    
    # Traitement du formulaire de contact
    # Dans une version complète, vous enverriez un email ou enregistreriez dans une base de données
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')
    
    flash(_('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'), 'success')
    return redirect(url_for('contact', lang=lang))

# Traitement de l'upload de texte
@app.route('/<lang>/upload', methods=['POST'])
def upload_text(lang):
    if lang not in LANGUAGES:
        return redirect(url_for('revue', lang='fr'))
    
    # Vérification du code d'authentification
    auth_code = request.form.get('auth_code')
    if auth_code != app.config['AUTH_CODE']:
        flash(_('Code d\'authentification incorrect.'), 'error')
        return redirect(url_for('revue', lang=lang))
    
    # Vérification du fichier
    if 'file' not in request.files:
        flash(_('Aucun fichier sélectionné.'), 'error')
        return redirect(url_for('revue', lang=lang))
    
    file = request.files['file']
    if file.filename == '':
        flash(_('Aucun fichier sélectionné.'), 'error')
        return redirect(url_for('revue', lang=lang))
    
    if not allowed_file(file.filename):
        flash(_('Format de fichier non autorisé. Seuls les fichiers PDF sont acceptés.'), 'error')
        return redirect(url_for('revue', lang=lang))
    
    # Sauvegarde du fichier
    filename = secure_filename(file.filename)
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    # Récupération des métadonnées
    title = request.form.get('title')
    author = request.form.get('author')
    description = request.form.get('description')
    
    # Dans une version complète, vous enregistreriez ces métadonnées dans une base de données
    
    flash(_('Votre texte a été soumis avec succès.'), 'success')
    return redirect(url_for('revue', lang=lang))

# Gestion des erreurs
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

# Point d'entrée pour l'exécution
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
