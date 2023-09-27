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
        family_dict = [f.to_dict(only=("id","family_name", "family_username","tasks.id", "users.id")) for f in Family.query.all()]
        
        return make_response(
            family_dict,
            200
        )

api.add_resource(FamilyList, '/families', endpoint='/families')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

