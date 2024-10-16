from flask import jsonify, request
from src.models import db 
from src.models.order import Order

def get_all_orders():
    orders = Order.query.order_by(Order.id).all()
    return jsonify([order.to_dict() for order in orders])

def get_orders(id):
    orders = Order.query.filter(Order.user_id==str(id)).order_by(Order.created_at)
    return jsonify([order.to_dict() for order in orders])

def create_order(request):
    order = Order(
        item_id=request.get('item_id'), 
        user_id=request.get('user_id'), 
        quantity=request.get('quantity'),
        item_price=request.get('item_price'),
        item_name=request.get('item_name'),
    )
    db.session.add(order)
    db.session.commit()
    return order.to_dict()

def update_status(id,request):
    order = Order.query.get(id)
    if order:
        if request.get('status') not in ['pending', 'cancelled', 'completed']:
            return {'error': 'Invalid status'}, 400
        order.status = request.get('status')
        db.session.commit()
        return order.to_dict()
    return {'error': 'Order not found'}, 404

def delete_order(id):
    order = Order.query.get(id)
    if order:
        db.session.delete(order)
        db.session.commit()
        return {'message': 'Order deleted'}
    return {'error': 'Order not found'}, 404
