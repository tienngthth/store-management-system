from os import environ
from flask import Flask
from flask_cors import CORS
from .models import db
from .models.user import User
from .routes.root import root_api
from .routes.auth import auth_api
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config['SECRET_KEY'] = environ.get("SECRET_KEY", "SECRET_KEY")
app.config["JWT_SECRET_KEY"] = environ.get("JWT_SECRET_KEY", "JWT_SECRET_KEY")
app.config['JWT_TOKEN_LOCATION'] = environ.get("JWT_TOKEN_LOCATION", "headers")

jwt = JWTManager(app)

cors = CORS(
   app,
   allow_headers=["*"]
)

def register_blueprints(app):
   app.register_blueprint(root_api, name="root") 
   app.register_blueprint(auth_api, name="auth")

def load_models(app):
   db.init_app(app) 
   with app.app_context(): 
      db.create_all() 
      db.session.commit()

def create_app():
   app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URL", "postgresql://administrator:verySecretPassword@localhost:5432/db")
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

   # Load the models 
   load_models(app)

   # Register the blueprints 
   register_blueprints(app)

   return app

