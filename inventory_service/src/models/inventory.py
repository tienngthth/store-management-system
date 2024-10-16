import datetime
from . import db 

class Inventory(db.Model): 
   __tablename__ = 'inventory'
   
   # primary key 
   id = db.Column(db.Integer, primary_key=True)
   
   # name
   name = db.Column(db.String(255), nullable=False)
   
   # quantity
   quantity = db.Column(db.Integer, nullable=False)
   
   # price
   price = db.Column(db.Float, nullable=False)
   
   # description
   description = db.Column(db.String(255), nullable=False, default='')

   # created date
   created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

   def to_dict(self):
      return {
         'id': self.id,
         'name': self.name,
         'quantity': self.quantity,
         'price': self.price,
         'description': self.description,
         'created_at': self.created_at,
      }
