from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from datetime import datetime

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/')
def dashboard():
    current_year = datetime.now().year
    # Dans une application réelle, vous vérifieriez l'authentification ici
    return render_template('admin/dashboard.html', current_year=current_year)

@admin_bp.route('/publications')
def publications():
    current_year = datetime.now().year
    # Dans une application réelle, vous récupéreriez les publications depuis la base de données
    publications = []  # Liste vide pour le moment
    return render_template('admin/publications.html', publications=publications, current_year=current_year)

@admin_bp.route('/publications/add', methods=['GET', 'POST'])
def add_publication():
    current_year = datetime.now().year
    if request.method == 'POST':
        # Logique pour ajouter une publication
        title = request.form.get('title')
        author = request.form.get('author')
        summary = request.form.get('summary')
        
        # Gestion du fichier uploadé
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '' and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
                filename = f"{timestamp}_{filename}"
                
                uploads_dir = os.path.join(current_app.root_path, 'static', 'uploads')
                os.makedirs(uploads_dir, exist_ok=True)
                
                file_path = os.path.join(uploads_dir, filename)
                file.save(file_path)
                
                # Ici, vous enregistreriez les métadonnées dans la base de données
                
                flash('Publication ajoutée avec succès!', 'success')
                return redirect(url_for('admin.publications'))
        
        flash('Erreur lors de l\'ajout de la publication.', 'danger')
    
    return render_template('admin/add_publication.html', current_year=current_year)

@admin_bp.route('/publications/edit/<int:id>', methods=['GET', 'POST'])
def edit_publication(id):
    current_year = datetime.now().year
    # Dans une application réelle, vous récupéreriez la publication depuis la base de données
    publication = None  # Pour le moment
    
    if request.method == 'POST':
        # Logique pour modifier une publication
        flash('Publication modifiée avec succès!', 'success')
        return redirect(url_for('admin.publications'))
    
    return render_template('admin/edit_publication.html', publication=publication, current_year=current_year)

@admin_bp.route('/publications/delete/<int:id>', methods=['POST'])
def delete_publication(id):
    # Logique pour supprimer une publication
    flash('Publication supprimée avec succès!', 'success')
    return redirect(url_for('admin.publications'))

@admin_bp.route('/events')
def events():
    current_year = datetime.now().year
    # Dans une application réelle, vous récupéreriez les événements depuis la base de données
    events = []  # Liste vide pour le moment
    return render_template('admin/events.html', events=events, current_year=current_year)

@admin_bp.route('/gallery')
def gallery():
    current_year = datetime.now().year
    # Dans une application réelle, vous récupéreriez les images depuis la base de données
    images = []  # Liste vide pour le moment
    return render_template('admin/gallery.html', images=images, current_year=current_year)

def allowed_file(filename):
    """Vérifie si l'extension du fichier est autorisée"""
    ALLOWED_EXTENSIONS = {'pdf'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
