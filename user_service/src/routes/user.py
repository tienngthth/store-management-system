from flask import Blueprint, jsonify, request
from src.controllers import user_controller
from src.models.user import User

users_api = Blueprint('api', __name__, url_prefix='/users') 

@users_api.route('/', methods=['GET'])
def list_orders():
    return user_controller.get_users()

@users_api.route('/', methods=['POST'])
def create_order():
    res = user_controller.create_user(request.json)
    return res, 400 if "error" in res else 201
