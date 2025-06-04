from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from datetime import datetime

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
        message = request.form.get('message')
        
        # Ici, vous pourriez envoyer un email ou enregistrer dans la base de données
        
        flash('Votre message a été envoyé avec succès!', 'success')
        return redirect(url_for('main.contact'))
        
    return render_template('contact.html', current_year=current_year)

@main_bp.route('/nouvelle-revue', methods=['GET', 'POST'])
def nouvelle_revue():
    current_year = datetime.now().year
    if request.method == 'POST':
        # Vérification du code d'accès
        access_code = request.form.get('accessCode')
        if access_code != '28012003':
            flash('Code d\'accès incorrect. Veuillez réessayer.', 'danger')
            return redirect(url_for('main.nouvelle_revue'))
        
        # Récupération des données du formulaire
        title = request.form.get('title')
        author = request.form.get('author')
        summary = request.form.get('summary')
        
        # Gestion du fichier uploadé
        if 'file' not in request.files:
            flash('Aucun fichier sélectionné', 'danger')
            return redirect(request.url)
            
        file = request.files['file']
        
        if file.filename == '':
            flash('Aucun fichier sélectionné', 'danger')
            return redirect(request.url)
            
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Création d'un nom de fichier unique avec timestamp
            timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
            filename = f"{timestamp}_{filename}"
            
            # Création du dossier uploads s'il n'existe pas
            uploads_dir = os.path.join(current_app.root_path, 'static', 'uploads')
            os.makedirs(uploads_dir, exist_ok=True)
            
            file_path = os.path.join(uploads_dir, filename)
            file.save(file_path)
            
            # Ici, vous pourriez enregistrer les métadonnées dans la base de données
            
            flash('Votre texte a été soumis avec succès!', 'success')
            return redirect(url_for('main.nouvelle_revue'))
        else:
            flash('Format de fichier non autorisé. Seuls les fichiers PDF sont acceptés.', 'danger')
            return redirect(request.url)
            
    return render_template('nouvelle_revue.html', current_year=current_year)

def allowed_file(filename):
    """Vérifie si l'extension du fichier est autorisée"""
    ALLOWED_EXTENSIONS = {'pdf'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
