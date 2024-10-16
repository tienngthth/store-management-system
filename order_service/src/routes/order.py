from flask import Blueprint, jsonify, request
from src.controllers import order_controller
from src.models.order import Order

orders_api = Blueprint('api', __name__, url_prefix='/orders') 

@orders_api.route('/', methods=['GET'])
def list_orders():
    return order_controller.get_all_orders()

@orders_api.route('/', methods=['POST'])
def create_order():
    res = order_controller.create_order(request.json)
    return res, 400 if "error" in res else 201

@orders_api.route('/<int:id>/', methods=['GET'])
def get_orders(id):
    return order_controller.get_orders(id)

@orders_api.route('/<int:id>/', methods=['DELETE'])
def delete_order(id):
    res = order_controller.delete_order(id)
    return res, 400 if "error" in res else 200

@orders_api.route('/<int:id>/', methods=['PUT'])
def update_status(id):
    res = order_controller.update_status(id,request.json)
    return res, 400 if "error" in res else 200
