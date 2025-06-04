from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import sys

# Ajout du chemin parent pour les imports
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Initialisation de l'application Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'votre_clé_secrète_à_changer_en_production'

# Configuration de la base de données
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USERNAME', 'root')}:{os.getenv('DB_PASSWORD', 'password')}@{os.getenv('DB_HOST', 'localhost')}:{os.getenv('DB_PORT', '3306')}/{os.getenv('DB_NAME', 'mydb')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialisation de la base de données
db = SQLAlchemy(app)

# Configuration des dossiers d'upload
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limite à 16 Mo

# Création du dossier d'upload s'il n'existe pas
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Importation et enregistrement des blueprints
from src.routes.main import main_bp
from src.routes.auth import auth_bp
from src.routes.admin import admin_bp

app.register_blueprint(main_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)

# Contexte global pour les templates
@app.context_processor
def inject_globals():
    from datetime import datetime
    return dict(current_year=datetime.now().year)

# Point d'entrée de l'application
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
