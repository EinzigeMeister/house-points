from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
## revert to base Family model: flask db revision -m'Add Family model'

class Family(db.Model, SerializerMixin):
   __tablename__ = 'families'

   id = db.Column(db.Integer, primary_key=True)
   family_name = db.Column(db.String, nullable = False)
   family_username = db.Column(db.String, unique=True)
   _password_hash = db.Column(db.String)

   users = db.relationship('User', backref='family')

   serialize_rules = (
      "-users.family",
   )

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
   
class User(db.Model, SerializerMixin):
   __tablename__ = 'users'
      
   id = db.Column(db.Integer, primary_key = True)
   name = db.Column(db.String, nullable = False)
   head_of_household = db.Column(db.Boolean, default = False, nullable = False)

   family_id = db.Column(db.Integer, db.ForeignKey('families.id'))


   def __repr__(self):
      return f'User {self.name}, ID: {self.id}, Head of Household: {self.head_of_household}'