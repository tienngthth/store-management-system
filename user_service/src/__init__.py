from os import environ
from flask import Flask
from flask_cors import CORS
from .models import db
from .routes.root import root_api
from .routes.user import users_api
from .models.user import User
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)

cors = CORS(
   app,
   allow_headers=["*"]
)

def register_blueprints(app):
   app.register_blueprint(root_api, name="root") 
   app.register_blueprint(users_api, name="users")

def load_models(app):
   db.init_app(app) 
   with app.app_context(): 
      db.create_all() 
      db.session.commit()
      admin = User(email='admin', password='admin', role='admin')
      if not User.query.filter_by(email='admin').first():
         db.session.add(admin)
         db.session.commit()

def create_app():
   app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URL", "postgresql://administrator:verySecretPassword@postgres-database:5432/db")
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

   # Load the models 
   load_models(app)

   # Register the blueprints 
   register_blueprints(app)

   return app

