from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import json



main_bp = Blueprint('main', __name__)
@main_bp.route('/')
def index():
    current_year = datetime.now().year
    return render_template('index.html', current_year=current_year)

@main_bp.route('/histoire')
def histoire():
    current_year = datetime.now().year
    return render_template('histoire.html', current_year=current_year)

@main_bp.route('/presentation')
def presentation():
    current_year = datetime.now().year
    return render_template('presentation.html', current_year=current_year)

@main_bp.route('/valeurs')
def valeurs():
    current_year = datetime.now().year
    return render_template('valeurs.html', current_year=current_year)

@main_bp.route('/archives')
def archives():
    current_year = datetime.now().year
    return render_template('archives.html', current_year=current_year)

@main_bp.route('/photos')
def photos():
    current_year = datetime.now().year
    return render_template('photos.html', current_year=current_year)

@main_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    current_year = datetime.now().year
    if request.method == 'POST':
        # Logique pour traiter le formulaire de contact
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        # Ici, vous pourriez envoyer un e-mail ou enregistrer dans la base de données

        flash('Votre message a été envoyé avec succès!', 'success')
        return redirect(url_for('main.contact'))
    return render_template('contact.html', current_year=current_year)

@main_bp.route('/nouvelle-revue', methods=['GET', 'POST'])
def nouvelle_revue():
    uploads_dir = os.path.join(current_app.root_path, 'static', 'uploads')
    meta_path = os.path.join(uploads_dir, 'meta.json')

    # Charger les métadonnées existantes
    if os.path.exists(meta_path):
        with open(meta_path, 'r', encoding='utf-8') as f:
            meta = json.load(f)
    else:
        meta = {}

    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        access_code = request.form.get('accessCode')
        file = request.files.get('file')
        if access_code != '28012003':
            return jsonify({'success': False, 'message': "Code d'accès incorrect. Veuillez réessayer."})
        if not file or not file.filename.endswith('.pdf'):
            return jsonify({'success': False, 'message': "Format de fichier non autorisé. Seuls les fichiers PDF sont acceptés."})
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        filename = f"{timestamp}_{filename}"
        os.makedirs(uploads_dir, exist_ok=True)
        file.save(os.path.join(uploads_dir, filename))
        # Enregistre les métadonnées
        meta[filename] = {
            'title': title,
            'author': author,
            'date': datetime.now().strftime('%d/%m/%Y')
        }
        with open(meta_path, 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
        return jsonify({'success': True, 'message': "Votre texte a été soumis avec succès !"})

    # Pour GET, lister les PDF déjà uploadés avec métadonnées
    pdfs = []
    if os.path.exists(uploads_dir):
        for f in os.listdir(uploads_dir):
            if f.lower().endswith('.pdf'):
                info = meta.get(f, {})
                pdfs.append({
                    'filename': f,
                    'title': info.get('title', f),
                    'author': info.get('author', 'Auteur inconnu'),
                    'date': info.get('date', '')
                })
        pdfs.sort(key=lambda x: os.path.getctime(os.path.join(uploads_dir, x['filename'])), reverse=True)
    return render_template('nouvelle_revue.html', pdfs=pdfs)