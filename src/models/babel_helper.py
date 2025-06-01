from flask_babel import Babel, gettext as _

def init_babel(app):
    babel = Babel(app)
    
    @babel.localeselector
    def get_locale():
        return app.config.get('BABEL_DEFAULT_LOCALE')
    
    # Add gettext to Jinja2 environment
    app.jinja_env.globals.update(_=_)
    
    return babel
