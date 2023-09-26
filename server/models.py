from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!

class Family(db.Model, SerializerMixin):
   __tablename__ = 'families'

   id = db.Column(db.Integer, primary_key=True)
   family_name = db.Column(db.String, unique=True)
   _password_hash = db.Column(db.String)

   @hybrid_property
   def password_hash(self):
      raise Exception("Password hashes may not be viewed.")
   
   @password_hash.setter
   def password_hash(self, password):
      bcrypt_hash = bcrypt.generate_password_hash(password).decode('utf-8')
      self._password_hash = bcrypt_hash
   
   def authenticate(self, password):
      return bcrypt.check_password_hash(self._password_hash, password)
   
   def __repr__(self):
      return f'Family {self.family_name}, ID: {self.id}'