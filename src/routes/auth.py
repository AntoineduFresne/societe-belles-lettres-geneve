from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    current_year = datetime.now().year
    if request.method == 'POST':
        # Vérification du code d'accès pour l'administration
        access_code = request.form.get('access_code')
        if access_code == '28012003':  # Code d'accès défini par l'utilisateur
            # Dans une application réelle, vous utiliseriez une session pour stocker l'état d'authentification
            flash('Connexion réussie!', 'success')
            return redirect(url_for('admin.dashboard'))
        else:
            flash('Code d\'accès incorrect. Veuillez réessayer auth route.', 'danger')
    
    return render_template('auth/login.html', current_year=current_year)

@auth_bp.route('/logout')
def logout():
    # Dans une application réelle, vous supprimeriez la session ici
    flash('Vous avez été déconnecté.', 'info')
    return redirect(url_for('main.index'))
