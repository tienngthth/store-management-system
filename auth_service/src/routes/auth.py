from flask import Blueprint, jsonify, request
from src.models.user import User
from flask_jwt_extended import create_access_token

auth_api = Blueprint('api', __name__, url_prefix='/auth') 

@auth_api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if 'email' in data and 'password' in data:
        email = data['email']
        password = data['password']

        user = User.query.filter_by(email=email).first()

        if user and user.password == password:
            access_token = create_access_token(identity=user.id)
            return jsonify({'message': 'Login Success', 'access_token': access_token, 'user': user.to_dict()})
        return jsonify({'error': 'Unauthorized'}), 401
    return jsonify({'error': 'Login Failed'}), 401
