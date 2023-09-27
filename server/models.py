from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
## revert to base Family model: flask db revision -m'Add Family model'

class Family(db.Model, SerializerMixin):
   __tablename__ = 'family_table'

   id = db.Column(db.Integer, primary_key=True)
   family_name = db.Column(db.String, nullable = False)
   family_username = db.Column(db.String, unique=True)
   _password_hash = db.Column(db.String)

   users = db.relationship('User', back_populates = "family")
   tasks = db.relationship('Task', back_populates = "family")

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
      return f'Family: {self.family_name}, ID: {self.id}'
   
class User(db.Model, SerializerMixin):
   __tablename__ = 'user_table'

   id = db.Column(db.Integer, primary_key = True)
   name = db.Column(db.String, nullable = False)
   head_of_household = db.Column(db.Boolean, default = False, nullable = False)

   family_id = db.Column(db.Integer, db.ForeignKey('family_table.id'))
   family = db.relationship("Family")
   tasks = db.relationship('Task')



   def __repr__(self):
      return f'User: {self.name}, ID: {self.id}, Head of Household: {self.head_of_household}'
   
class Task(db.Model, SerializerMixin):
   __tablename__ = 'task_table'

   id = db.Column(db.Integer, primary_key = True)
   title = db.Column(db.String, nullable = False)
   location = db.Column(db.String, default = "Home")
   description = db.Column(db.String, nullable = False)
   points = db.Column(db.Integer, default = 1)
   frequency = db.Column(db.String, default = "Daily")
   
   user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))  # Completed by
   user = db.relationship("User")
   family_id = db.Column(db.Integer, db.ForeignKey('family_table.id'))
   family = db.relationship("Family")

   def __repr__(self):
      return f'Task: {self.title}, ID: {self.id}, Location: {self.location}'