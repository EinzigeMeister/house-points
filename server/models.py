from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class Like(db.Model):
   __tablename__ = 'like_table'
   id = db.Column(db.Integer, primary_key = True, autoincrement = True)
   liking_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
   liked_by_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

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
      raise AttributeError("Password hashes may not be viewed.")
   
   @password_hash.setter
   def password_hash(self, password):
      bcrypt_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
      self._password_hash = bcrypt_hash
   
   def authenticate(self, password):
      return bcrypt.check_password_hash(self._password_hash, password)
   
   def __repr__(self):
      return f'Family: {self.family_name}, ID: {self.id}'
   
class User(db.Model, SerializerMixin):
   __tablename__ = 'user_table'

   id = db.Column(db.Integer, primary_key = True, autoincrement=True)
   name = db.Column(db.String, nullable = False)
   head_of_household = db.Column(db.Boolean, default = False, nullable = False)
   _password_hash = db.Column(db.String)
   
   family_id = db.Column(db.Integer, db.ForeignKey('family_table.id'))
   family = db.relationship("Family")
   tasks = db.relationship('Task')
   

   liked_by = db.relationship('User', secondary= 'like_table', primaryjoin =(Like.liked_by_id==id), secondaryjoin=(Like.liking_id==id), backref='liking')

   @hybrid_property
   def password_hash(self):
      raise AttributeError("Password hashes may not be viewed.")
   
   @password_hash.setter
   def password_hash(self, password):
      bcrypt_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
      self._password_hash = bcrypt_hash
   
   def authenticate(self, password):
      return bcrypt.check_password_hash(self._password_hash, password)
   
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
   
   completed_by_user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))  # Completed by
   user = db.relationship("User", overlaps="tasks")
   family_id = db.Column(db.Integer, db.ForeignKey('family_table.id'))
   family = db.relationship("Family")

   def __repr__(self):
      return f'Task: {self.title}, ID: {self.id}, Location: {self.location}'
