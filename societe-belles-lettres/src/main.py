from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import json
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))  # DON'T CHANGE THIS !!!

from models.babel_helper import init_babel

app = Flask(__name__)
app.config['SECRET_KEY'] = 'societe-belles-lettres-geneve-secret-key'
app.config['UPLOAD_FOLDER'] = os.path.join(app.static_folder, 'uploads/pdf')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
app.config['BABEL_DEFAULT_LOCALE'] = 'fr'

# Initialize Babel
babel = init_babel(app)

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Authentication code
AUTH_CODE = "28012003"

# Available languages
LANGUAGES = {
    'fr': 'Français',
    'en': 'English',
    'de': 'Deutsch',
    'it': 'Italiano'
}

# Translations dictionary
TRANSLATIONS = {
    # Navigation
    'nav.home': {
        'fr': 'Accueil',
        'en': 'Home',
        'de': 'Startseite',
        'it': 'Home'
    },
    'nav.history': {
        'fr': 'Histoire',
        'en': 'History',
        'de': 'Geschichte',
        'it': 'Storia'
    },
    'nav.presentation': {
        'fr': 'Présentation',
        'en': 'About Us',
        'de': 'Über uns',
        'it': 'Chi siamo'
    },
    'nav.values': {
        'fr': 'Valeurs',
        'en': 'Values',
        'de': 'Werte',
        'it': 'Valori'
    },
    'nav.archives': {
        'fr': 'Archives',
        'en': 'Archives',
        'de': 'Archiv',
        'it': 'Archivi'
    },
    'nav.photos': {
        'fr': 'Photos',
        'en': 'Photos',
        'de': 'Fotos',
        'it': 'Foto'
    },
    'nav.revue': {
        'fr': 'La Nouvelle Revue',
        'en': 'The New Review',
        'de': 'Die Neue Revue',
        'it': 'La Nuova Rivista'
    },
    'nav.contact': {
        'fr': 'Contact',
        'en': 'Contact',
        'de': 'Kontakt',
        'it': 'Contatto'
    },
    
    # Language notice
    'language.gender.notice': {
        'fr': 'Ce site utilise le français comme langue de genre.',
        'en': 'This site uses French as the gender language.',
        'de': 'Diese Website verwendet Französisch als Genussprache.',
        'it': 'Questo sito utilizza il francese come lingua di genere.'
    },
    
    # Logo alt text
    'logo.alt': {
        'fr': 'Logo Société de Belles-Lettres Genève',
        'en': 'Logo Société de Belles-Lettres Geneva',
        'de': 'Logo Société de Belles-Lettres Genf',
        'it': 'Logo Société de Belles-Lettres Ginevra'
    },
    
    # Revue page
    'revue.page.title': {
        'fr': 'La Nouvelle Revue - Société de Belles-Lettres Genève',
        'en': 'The New Review - Société de Belles-Lettres Geneva',
        'de': 'Die Neue Revue - Société de Belles-Lettres Genf',
        'it': 'La Nuova Rivista - Société de Belles-Lettres Ginevra'
    },
    'revue.page.description': {
        'fr': 'Découvrez la Nouvelle Revue de Belles-Lettres, un espace d\'expression poétique et artistique des membres.',
        'en': 'Discover the New Review of Belles-Lettres, a space for poetic and artistic expression by members.',
        'de': 'Entdecken Sie die Neue Revue von Belles-Lettres, einen Raum für poetischen und künstlerischen Ausdruck der Mitglieder.',
        'it': 'Scopri la Nuova Rivista di Belles-Lettres, uno spazio di espressione poetica e artistica dei membri.'
    },
    'revue.hero.title': {
        'fr': 'La Nouvelle Revue de Belles-Lettres',
        'en': 'The New Review of Belles-Lettres',
        'de': 'Die Neue Revue von Belles-Lettres',
        'it': 'La Nuova Rivista di Belles-Lettres'
    },
    'revue.hero.subtitle': {
        'fr': 'Expression poétique et artistique des membres',
        'en': 'Poetic and artistic expression of members',
        'de': 'Poetischer und künstlerischer Ausdruck der Mitglieder',
        'it': 'Espressione poetica e artistica dei membri'
    },
    'revue.presentation.title': {
        'fr': 'Présentation de la Revue',
        'en': 'About the Review',
        'de': 'Über die Revue',
        'it': 'Presentazione della Rivista'
    },
    'revue.presentation.text1': {
        'fr': 'La Nouvelle Revue de Belles-Lettres est un espace d\'expression libre où les membres de notre société partagent leurs créations littéraires, poétiques et artistiques.',
        'en': 'The New Review of Belles-Lettres is a space for free expression where members of our society share their literary, poetic and artistic creations.',
        'de': 'Die Neue Revue von Belles-Lettres ist ein Raum für freie Meinungsäußerung, in dem die Mitglieder unserer Gesellschaft ihre literarischen, poetischen und künstlerischen Kreationen teilen.',
        'it': 'La Nuova Rivista di Belles-Lettres è uno spazio di libera espressione dove i membri della nostra società condividono le loro creazioni letterarie, poetiche e artistiche.'
    },
    'revue.presentation.text2': {
        'fr': 'Ces textes n\'ont aucun but scientifique, littéraire ou de revendication d\'originalité. Ils sont simplement des compilations poétiques, une expression de beauté et d\'idées, et ne sont pas monétisables.',
        'en': 'These texts have no scientific or literary purpose, nor do they claim originality. They are simply poetic compilations, an expression of beauty and ideas, and are not monetizable.',
        'de': 'Diese Texte haben keinen wissenschaftlichen oder literarischen Zweck und erheben keinen Anspruch auf Originalität. Sie sind einfach poetische Zusammenstellungen, ein Ausdruck von Schönheit und Ideen, und sind nicht monetarisierbar.',
        'it': 'Questi testi non hanno alcuno scopo scientifico o letterario, né rivendicano originalità. Sono semplicemente compilazioni poetiche, un\'espressione di bellezza e idee, e non sono monetizzabili.'
    },
    'revue.presentation.text3': {
        'fr': 'Nous vous invitons à découvrir ces œuvres qui reflètent la diversité de pensée et la richesse créative de nos membres.',
        'en': 'We invite you to discover these works that reflect the diversity of thought and creative richness of our members.',
        'de': 'Wir laden Sie ein, diese Werke zu entdecken, die die Vielfalt des Denkens und den kreativen Reichtum unserer Mitglieder widerspiegeln.',
        'it': 'Vi invitiamo a scoprire queste opere che riflettono la diversità di pensiero e la ricchezza creativa dei nostri membri.'
    },
    'revue.disclaimer.title': {
        'fr': 'Note importante',
        'en': 'Important Note',
        'de': 'Wichtiger Hinweis',
        'it': 'Nota importante'
    },
    'revue.disclaimer.text': {
        'fr': 'Les textes et œuvres présentés dans cette section sont des expressions personnelles des membres de la Société de Belles-Lettres Genève. Ils n\'ont aucune prétention scientifique ou littéraire et ne sont pas destinés à être monétisés. Ils représentent simplement un espace d\'expression artistique et poétique.',
        'en': 'The texts and works presented in this section are personal expressions of the members of the Société de Belles-Lettres Geneva. They have no scientific or literary pretensions and are not intended to be monetized. They simply represent a space for artistic and poetic expression.',
        'de': 'Die in diesem Abschnitt präsentierten Texte und Werke sind persönliche Ausdrucksformen der Mitglieder der Société de Belles-Lettres Genf. Sie haben keine wissenschaftlichen oder literarischen Ansprüche und sind nicht zur Monetarisierung bestimmt. Sie stellen einfach einen Raum für künstlerischen und poetischen Ausdruck dar.',
        'it': 'I testi e le opere presentati in questa sezione sono espressioni personali dei membri della Société de Belles-Lettres Ginevra. Non hanno pretese scientifiche o letterarie e non sono destinati ad essere monetizzati. Rappresentano semplicemente uno spazio di espressione artistica e poetica.'
    },
    'revue.publications.title': {
        'fr': 'Publications récentes',
        'en': 'Recent Publications',
        'de': 'Neueste Veröffentlichungen',
        'it': 'Pubblicazioni recenti'
    },
    'revue.publications.download': {
        'fr': 'Télécharger le PDF',
        'en': 'Download PDF',
        'de': 'PDF herunterladen',
        'it': 'Scarica PDF'
    },
    'revue.no.publications': {
        'fr': 'Aucune publication n\'est disponible pour le moment.',
        'en': 'No publications are available at the moment.',
        'de': 'Derzeit sind keine Veröffentlichungen verfügbar.',
        'it': 'Nessuna pubblicazione è disponibile al momento.'
    },
    'revue.contribution.title': {
        'fr': 'Comment contribuer',
        'en': 'How to Contribute',
        'de': 'Wie man beitragen kann',
        'it': 'Come contribuire'
    },
    'revue.contribution.text1': {
        'fr': 'La Nouvelle Revue de Belles-Lettres est ouverte aux contributions de tous les membres de la société.',
        'en': 'The New Review of Belles-Lettres is open to contributions from all members of the society.',
        'de': 'Die Neue Revue von Belles-Lettres steht Beiträgen aller Mitglieder der Gesellschaft offen.',
        'it': 'La Nuova Rivista di Belles-Lettres è aperta ai contributi di tutti i membri della società.'
    },
    'revue.contribution.text2': {
        'fr': 'Si vous souhaitez partager vos créations, veuillez contacter le comité éditorial via le formulaire de contact en précisant votre intention de contribuer à la revue.',
        'en': 'If you wish to share your creations, please contact the editorial committee via the contact form, specifying your intention to contribute to the review.',
        'de': 'Wenn Sie Ihre Kreationen teilen möchten, kontaktieren Sie bitte das Redaktionskomitee über das Kontaktformular und geben Sie Ihre Absicht an, zur Revue beizutragen.',
        'it': 'Se desideri condividere le tue creazioni, contatta il comitato editoriale tramite il modulo di contatto, specificando la tua intenzione di contribuire alla rivista.'
    },
    'revue.contribution.text3': {
        'fr': 'Tous les formats sont acceptés (poèmes, essais, nouvelles, dessins, etc.) tant qu\'ils peuvent être présentés sous forme de PDF.',
        'en': 'All formats are accepted (poems, essays, short stories, drawings, etc.) as long as they can be presented in PDF format.',
        'de': 'Alle Formate werden akzeptiert (Gedichte, Essays, Kurzgeschichten, Zeichnungen usw.), solange sie im PDF-Format präsentiert werden können.',
        'it': 'Tutti i formati sono accettati (poesie, saggi, racconti, disegni, ecc.) purché possano essere presentati in formato PDF.'
    },
    'revue.contribution.contact': {
        'fr': 'Contacter le comité éditorial',
        'en': 'Contact the Editorial Committee',
        'de': 'Kontaktieren Sie das Redaktionskomitee',
        'it': 'Contatta il comitato editoriale'
    },
    
    # Footer
    'footer.description': {
        'fr': 'La Société de Belles-Lettres Genève est une société d\'étudiants qui incarne l\'esprit genevois depuis [ANNÉE].',
        'en': 'The Société de Belles-Lettres Geneva is a student society embodying the spirit of Geneva since [YEAR].',
        'de': 'Die Société de Belles-Lettres Genf ist eine Studentengesellschaft, die den Geist Genfs seit [JAHR] verkörpert.',
        'it': 'La Société de Belles-Lettres Ginevra è una società studentesca che incarna lo spirito ginevrino dal [ANNO].'
    },
    'footer.navigation': {
        'fr': 'Navigation',
        'en': 'Navigation',
        'de': 'Navigation',
        'it': 'Navigazione'
    },
    'footer.follow': {
        'fr': 'Suivez-nous',
        'en': 'Follow Us',
        'de': 'Folgen Sie uns',
        'it': 'Seguici'
    },
    'footer.copyright': {
        'fr': '© 2025 Société de Belles-Lettres Genève. Tous droits réservés.',
        'en': '© 2025 Société de Belles-Lettres Geneva. All rights reserved.',
        'de': '© 2025 Société de Belles-Lettres Genf. Alle Rechte vorbehalten.',
        'it': '© 2025 Société de Belles-Lettres Ginevra. Tutti i diritti riservati.'
    }
}

# Helper functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def get_publications():
    """Get list of publications from JSON file or create if not exists"""
    publications_file = os.path.join(app.static_folder, 'uploads', 'publications.json')
    if os.path.exists(publications_file):
        with open(publications_file, 'r', encoding='utf-8') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    else:
        # Create empty publications file
        with open(publications_file, 'w', encoding='utf-8') as f:
            json.dump([], f)
        return []

def save_publications(publications):
    """Save publications to JSON file"""
    publications_file = os.path.join(app.static_folder, 'uploads', 'publications.json')
    with open(publications_file, 'w', encoding='utf-8') as f:
        json.dump(publications, f, ensure_ascii=False, indent=2)

def _(key, default=None):
    """Translation function"""
    lang = session.get('language', 'fr')
    if key in TRANSLATIONS and lang in TRANSLATIONS[key]:
        return TRANSLATIONS[key][lang]
    return default or key

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/histoire')
def histoire():
    return render_template('histoire.html')

@app.route('/presentation')
def presentation():
    return render_template('presentation.html')

@app.route('/valeurs')
def valeurs():
    return render_template('valeurs.html')

@app.route('/archives')
def archives():
    return render_template('archives.html')

@app.route('/photos')
def photos():
    return render_template('photos.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/revue')
def revue():
    publications = get_publications()
    return render_template('revue.html', publications=publications)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    error = None
    if request.method == 'POST':
        if request.form.get('code') == AUTH_CODE:
            session['authenticated'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            error = "Code d'authentification incorrect"
    
    return render_template('admin.html', error=error)

@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('authenticated'):
        return redirect(url_for('admin'))
    
    publications = get_publications()
    return render_template('admin_dashboard.html', publications=publications)

@app.route('/admin/upload', methods=['POST'])
def admin_upload():
    if not session.get('authenticated'):
        return redirect(url_for('admin'))
    
    if 'pdf_file' not in request.files:
        flash('Aucun fichier sélectionné')
        return redirect(url_for('admin_dashboard'))
    
    file = request.files['pdf_file']
    
    if file.filename == '':
        flash('Aucun fichier sélectionné')
        return redirect(url_for('admin_dashboard'))
    
    if file and allowed_file(file.filename):
        # Secure the filename and add timestamp to avoid duplicates
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        original_filename = secure_filename(file.filename)
        filename = f"{timestamp}_{original_filename}"
        
        # Save the file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Add publication to the list
        publications = get_publications()
        new_publication = {
            'id': timestamp,
            'title': {
                'fr': request.form.get('title_fr', ''),
                'en': request.form.get('title_en', ''),
                'de': request.form.get('title_de', ''),
                'it': request.form.get('title_it', '')
            },
            'author': {
                'fr': request.form.get('author_fr', ''),
                'en': request.form.get('author_en', ''),
                'de': request.form.get('author_de', ''),
                'it': request.form.get('author_it', '')
            },
            'description': {
                'fr': request.form.get('description_fr', ''),
                'en': request.form.get('description_en', ''),
                'de': request.form.get('description_de', ''),
                'it': request.form.get('description_it', '')
            },
            'date': datetime.now().strftime('%d/%m/%Y'),
            'filename': filename
        }
        publications.append(new_publication)
        save_publications(publications)
        
        flash('Publication ajoutée avec succès')
        return redirect(url_for('admin_dashboard'))
    
    flash('Type de fichier non autorisé. Seuls les PDF sont acceptés.')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete/<publication_id>', methods=['POST'])
def admin_delete(publication_id):
    if not session.get('authenticated'):
        return redirect(url_for('admin'))
    
    publications = get_publications()
    
    # Find the publication to delete
    for i, pub in enumerate(publications):
        if pub['id'] == publication_id:
            # Delete the file
            try:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], pub['filename']))
            except:
                pass  # File might not exist
            
            # Remove from list
            publications.pop(i)
            save_publications(publications)
            flash('Publication supprimée avec succès')
            break
    
    return redirect(url_for('admin_dashboard'))

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

@app.route('/set_language/<language>')
def set_language(language):
    if language in LANGUAGES:
        session['language'] = language
    return redirect(request.referrer or url_for('index'))

@app.route('/logout')
def logout():
    session.pop('authenticated', None)
    return redirect(url_for('index'))

@app.context_processor
def inject_languages():
    return dict(languages=LANGUAGES, current_language=session.get('language', 'fr'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
