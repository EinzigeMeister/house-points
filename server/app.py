#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
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
        family_dict = [f.to_dict(only=("id","family_name", "family_username", "users.name")) for f in Family.query.all()]
        
        return make_response(
            family_dict,
            200
        )

class UserList(Resource):
    def get(self):
        user_dict = [u.to_dict(only=("id","name", "head_of_household", "family_id")) for u in User.query.all()]
        return make_response(
            user_dict,
            200
        )

class TaskList(Resource):
    def get(self):
        task_dict = [t.to_dict(only=("id","title", "location", "description", "points", "frequency", "completed_by_user_id", "family_id")) for t in Task.query.all()]
        return make_response(
            task_dict,
            200
        )


api.add_resource(TaskList, '/tasks', endpoint='tasks')
api.add_resource(UserList, '/users', endpoint='users')
api.add_resource(FamilyList, '/families', endpoint='families')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

