#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource
from sqlalchemy.sql import func
# Local imports
from config import app, db, api
# Add your model imports
from models import *

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
            new_family.to_dict(only=("id", "family_name", "family_username", "users.name", "tasks.id")),
            201
        )
        return response

class UserList(Resource):
    def get(self):
        user_dict = [u.to_dict(only=("id","name", "head_of_household", "family_id", "tasks.id")) for u in User.query.all()]
        return make_response(user_dict, 200)
    def post(self):
        user_json = request.get_json()
        name = user_json.get('name')
        password = user_json.get('password')
        head_of_household = user_json.get('head_of_household') or False

        if (not name or not password): return make_response({"error" : "Must include a name and password"}, 400)
        
        print(user_json)
        family_id = user_json.get('family_id')
        duplicate_user = User.query.filter_by(family_id=family_id, name=name).first()
        if duplicate_user:
            return make_response({"error" : "Must include a unique name, use a nickname if required or preferred"}, 400)
        
        new_user = User(
            name=user_json.get("name"),
            family_id=family_id,
            head_of_household=head_of_household
        )
        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()

        if new_user.head_of_household:
            session['user_id'] = new_user.id
        resp = make_response(
            new_user.to_dict(only=("id","name", "head_of_household", "family_id", "tasks.id")),
            201
        )
        return resp
    
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
            response = [{'family_id': family.to_dict(only=("id", "family_name", "family_username", "users.name", "tasks.id"))}]
            return make_response(response, 200)

        return {'error': 'Invalid username or password'}, 401
    
class UserLogin(Resource):
    def post(self):
        name = request.get_json()['name']
        user = User.query.filter_by(name=name, family_id=request.get_json()['family_id']).first()
        if not user:
            return {'error': 'Invalid username or password'}, 401
        password = request.get_json()['password']
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(only=('id', 'name', 'head_of_household', 'family_id', 'tasks.id'))
        return {'error': 'Invalid username or password'}, 401

        
class Logout(Resource):
    def delete(self):
        session['family_id'] = None
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)

class UserByFamily(Resource):
    def get(self, id):
        user_dict = [u.to_dict(only=("id","name", "head_of_household", "family_id", "tasks.id")) for u in User.query.filter_by(family_id=id).all()]
        return user_dict

class TasksByFamily(Resource):
    def get(self, id):
        task_dict = [t.to_dict(only=("id","title", "location", "description", "points", "frequency", "completed_by_user_id", "family_id")) for t in Task.query.filter_by(family_id=id).order_by("completed_by_user_id").all()]
        return make_response(task_dict, 200)
    def post(self, id):
        task_json = request.get_json()
        title = task_json.get("name"),
        description = task_json.get("description"),
        location = task_json.get("location", "home")
        if (len(location)<1): location = "home"
        frequency = task_json.get("frequency")
        points = task_json.get("points")
        family_id = id
        if (len(title) <1 or len(description)<1):
            return make_response({"error: ": "title and description required"}, 400)
        new_task = Task(
            title=title[0],
            description = description[0],
            location = location,
            frequency=frequency,
            points = points,
            family_id = family_id
        )
        db.session.add(new_task)
        db.session.commit()
        new_task_dict = new_task.to_dict(only=("id","title", "location", "description", "points", "frequency", "family_id"))
        return (new_task_dict, 200)
    def patch(self, id):
        request_json = request.get_json()
        task = Task.query.filter_by(id=id).first()
        for attr in request_json:
            setattr(task, attr, request.get_json()[attr])
        db.session.add(task)
        db.session.commit()
        
        response_dict = task.to_dict(only=("id","title", "location", "description", "points", "frequency", "completed_by_user_id", "family_id"))

        return make_response(
            response_dict,
            200
        )
    def delete(self, id):
        task = Task.query.filter_by(id=id).first()
        db.session.delete(task)
        db.session.commit()
        return ({"message": "successfully deleted task"}, 200)


class CheckSession(Resource):
    def get(self):
        family = Family.query.filter_by(id =session.get('family_id')).first()
        user = User.query.filter_by(id=session.get('user_id')).first()
        response= []
        if family:
            response.append({'family': family.to_dict(only=("id", "family_name", "family_username", "users.name", "tasks.id"))})
            if user:
                response.append({'user': user.to_dict(only=("id","name", "head_of_household", "family_id", "tasks.id"))})
        else:
            return make_response({'error': '401: Not Authorized'}, 401)
        return make_response(response, 200)
class PointsByUser(Resource):
    def get(self, id):
        user_points = db.session.query(func.sum(Task.points)).filter_by(completed_by_user_id=id).first()[0]
        user_points_dict = {"points": user_points}
        return make_response(user_points_dict, 200)
    
class PointsByFamily(Resource):
    def get(self, id):
        user_list= User.query.filter_by(family_id=id).all()
        user_scores = [{"user_id":user.id, "points": db.session.query(func.sum(Task.points)).filter_by(completed_by_user_id=user.id).first()[0] or 0} for user in user_list]
        return make_response({"score_list": user_scores}, 200)
class LikesByUserID(Resource):
    def get(self, id):
        user_likes = User.query.filter_by(id=id).first().liked_by
        return make_response({"likes":len(user_likes)}, 200)
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        request_json = request.get_json()
        liked_by_user = User.query.filter_by(id=request_json.get("liked_by")).first()
        if liked_by_user in user.liked_by:
            return make_response({"error":"User already liked this person"}, 400)
        user.liked_by.append(liked_by_user)
        db.session.add(user)
        db.session.commit()
        return make_response({"message": "Add like success"}, 200)

class LikesByFamily(Resource):
    def delete(self, id):
        user_list = User.query.filter_by(family_id=id)
        for user in user_list:
            like_list = Like.query.filter_by(liking_id=user.id).all()
            for like in like_list: db.session.delete(like)
            
        db.session.commit()
        return {},200

api.add_resource(LikesByFamily, '/likes/family/<int:id>', endpoint='likes/family/<int:id>')
api.add_resource(LikesByUserID, '/scoreboard/user/<int:id>', endpoint= 'scoreboard/user/<int:id>')    
api.add_resource(PointsByFamily, '/scoreboard/family/<int:id>', endpoint = 'scoreboard/family/<int:id>')
api.add_resource(PointsByUser, '/scoreboard/<int:id>', endpoint='scoreboard/<int:id>')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(TasksByFamily, '/tasks/family/<int:id>', endpoint='tasks/family/<int:id>')    
api.add_resource(UserByFamily, '/users/family/<int:id>', endpoint='user/family/<int:id>')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(UserLogin, '/user_login', endpoint='user_login')
api.add_resource(TaskList, '/tasks', endpoint='tasks')
api.add_resource(UserList, '/users', endpoint='users')
api.add_resource(FamilyList, '/families', endpoint='families')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

