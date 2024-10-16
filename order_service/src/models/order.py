import datetime
from . import db 

class Order(db.Model): 
   __tablename__ = 'order'
   
   # primary key 
   id = db.Column(db.Integer, primary_key=True)
   
   # item id
   item_id = db.Column(db.String(255), nullable=False)
   
   # item name
   item_name = db.Column(db.String(255), nullable=False)
   
   # item price
   item_price = db.Column(db.Float, nullable=False)
   
   # user id
   user_id = db.Column(db.String(255), nullable=False)
   
   # order status: pending, cancelled, completed
   status = db.Column(db.String(255), nullable=False, default='pending')
   
   # quantity
   quantity = db.Column(db.Integer, nullable=False)

   # created date
   created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

   def to_dict(self):
      return {
         'id': self.id,
         'item_id': self.item_id,
         'user_id': self.user_id,
         'item_name': self.item_name,
         'item_price': self.item_price,
         'status': self.status,
         'quantity': self.quantity,
         'created_at': self.created_at,
      }
