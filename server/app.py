#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Family, User, Task

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class FamilyList(Resource):
    def get(self):
        family_dict = [f.to_dict(only=("id","family_name", "family_username", "users.name", "tasks.id")) for f in Family.query.all()]
        
        return make_response(family_dict, 200)
    def post(self):
        data = request.get_json()
        duplicate_family = Family.query.filter_by(family_username=data["username"]).first()
        if duplicate_family:
            return make_response({"error":"username already exists"},400)
        new_family = Family(
            family_username = data["username"],
            family_name = data["family_name"]
        )
        new_family.password_hash = data["password"]
        db.session.add(new_family)
        db.session.commit()
        session['family_id']=new_family.id
        response = make_response(
            new_family.to_dict(only=("id", "family_name", "family_username")),
            201
        )
        return response

class UserList(Resource):
    def get(self):
        user_dict = [u.to_dict(only=("id","name", "head_of_household", "family_id", "tasks.id")) for u in User.query.all()]
        return make_response(user_dict, 200)

class TaskList(Resource):
    def get(self):
        task_dict = [t.to_dict(only=("id","title", "location", "description", "points", "frequency", "completed_by_user_id", "family_id")) for t in Task.query.all()]
        return make_response(task_dict, 200)
    
class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        family = Family.query.filter_by(family_username=username).first()
        if not family:
            return {'error': 'Invalid username or password'}, 401
        password = request.get_json()['password']

        if family.authenticate(password):
            session['family_id'] = family.id
            return family.to_dict(only=("id","family_name", "family_username", "users.name", "tasks.id")), 200

        return {'error': 'Invalid username or password'}, 401

class UserByFamily(Resource):
    def get(self, id):
        user_dict = [u.to_dict(only=("id","name", "head_of_household", "family_id", "tasks.id")) for u in User.query.filter_by(family_id=id).all()]
        return user_dict

class TasksByFamily(Resource):
    def get(self, id):
        task_dict = [t.to_dict(only=("id","title", "location", "description", "points", "frequency", "completed_by_user_id", "family_id")) for t in Task.query.filter_by(family_id=id).order_by("completed_by_user_id").all()]
        return make_response(task_dict, 200)
 
class TaskByID(Resource):
    def patch(self, id):
        task = Task.query.filter_by(id=id).first()
        for attr in request.get_json():
            setattr(task, attr, request.get_json()[attr])
        db.session.add(task)
        db.session.commit()
        
        response_dict = task.to_dict(only=("id","title", "location", "description", "points", "frequency", "completed_by_user_id", "family_id"))

        return make_response(
            response_dict,
            200
        )

api.add_resource(TaskByID, '/tasks/<int:id>', endpoint='tasks/<int:id>')
api.add_resource(TasksByFamily, '/tasks/family/<int:id>', endpoint='tasks/family/<int:id>')    
api.add_resource(UserByFamily, '/users/family/<int:id>', endpoint='user/family/<int:id>')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(TaskList, '/tasks', endpoint='tasks')
api.add_resource(UserList, '/users', endpoint='users')
api.add_resource(FamilyList, '/families', endpoint='families')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

