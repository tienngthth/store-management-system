from flask import jsonify, request
from src.models import db 
from src.models.inventory import Inventory

def get_items():
    items = Inventory.query.order_by(Inventory.id).all()
    return jsonify([{
        'id': item.id, 
        'name': item.name, 
        'quantity': item.quantity,
        'price': item.price,
        'description': item.description,
    } for item in items])
    return

def create_item(request):
    name = request.get('name')
    existing_item = Inventory.query.filter_by(name=name).first()
    if name:
        if existing_item:
            return {'error': 'Item already exists'}
        new_item = Inventory(name=name, quantity=request.get('quantity'), price=request.get('price'), description=request.get('description'))
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()
    return {'error': 'Name is required'}

def delete_item(id):
    existing_item = Inventory.query.filter_by(id=id).first()
    if existing_item:
        db.session.delete(existing_item)
        db.session.commit()
        return {'message': 'Item deleted'}
    else:
        return {'error': 'Item not found'}

def update_item(id, request):
    existing_item = Inventory.query.filter_by(id=id).first()
    if existing_item:
        existing_item.name = request.get('name')
        existing_item.quantity = request.get('quantity')
        existing_item.price = request.get('price')
        existing_item.description = request.get('description')
        db.session.commit()
        return existing_item.to_dict()
    else:
        return {'error': 'Item not found'}
    return
