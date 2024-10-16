import datetime
from . import db 

class User(db.Model): 
   __tablename__ = 'user'
   
   # primary key 
   id = db.Column(db.Integer, primary_key=True)
   
   # user role (admin, customer)
   role = db.Column(db.String(255), nullable=False, default='customer')
   
   # email
   email = db.Column(db.String(255), nullable=False)
   
   # password
   password = db.Column(db.String(255), nullable=False)

   # created date
   created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

   def to_dict(self):
       return {
           'id': self.id,
           'role': self.role,
           'email': self.email,
           'created_at': self.created_at
       }
