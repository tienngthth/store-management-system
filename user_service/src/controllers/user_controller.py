from flask import jsonify, request
from src.models import db 
from src.models.user import User

def get_users():
    return

def create_user(request):
    email = request.get('email')
    existing_user = User.query.filter_by(email=email).first()
    if email:
        if existing_user:
            return {'error': 'User already exists'}
        new_user = User(email=email, password=request.get('password'))
        db.session.add(new_user)
        db.session.commit()
        return {'id': new_user.id, 'email': email}
    return
