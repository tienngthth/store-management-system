from flask import Blueprint, jsonify, request
from src.controllers import inventory_controller
from src.models.inventory import Inventory

inventory_api = Blueprint('api', __name__, url_prefix='/inventory') 

@inventory_api.route('/', methods=['GET'])
def list_items():
    return inventory_controller.get_items()

@inventory_api.route('/', methods=['POST'])
def create_item():
    res = inventory_controller.create_item(request.json)
    return res, 400 if "error" in res else 201

@inventory_api.route('/<int:id>/', methods=['DELETE'])
def delete_item(id):
    res = inventory_controller.delete_item(id)
    return res, 400 if "error" in res else 200

@inventory_api.route('/<int:id>/', methods=['PUT'])
def update_item(id):
    res = inventory_controller.update_item(id, request.json)
    return res, 400 if "error" in res else 200
