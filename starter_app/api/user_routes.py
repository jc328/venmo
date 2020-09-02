from flask import Blueprint, jsonify, render_template, request, redirect, url_for
from starter_app.models import User
from ..models import User, db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_optional, create_access_token, get_jwt_identity, jwt_required
import random

user_routes = Blueprint("user", __name__, "")

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/signup', methods=['POST'])
def signup():

  data = request.get_json()
  hash = generate_password_hash(data['password'])

  newData = User(
    username=random.random(),
    first_name=data['firstName'],
    last_name=data['lastName'],
    email = data['email'],
    hashed_password = hash,
    balance = 500)

  db.session.add(newData)
  db.session.commit()
  return ""
  # try:
  #   return redirect(url_for('/signin'))
  # except Exception:
  #   return jsonify(message="User with that email or username already exists"), 409

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    return {'token': 'testing token'}


# @user_routes.route('/login', methods=['POST'])
# def login():
#     if not request.is_json:
#       return jsonify({"msg": "Missing JSON in request"}), 400

#     username = request.json.get('username', None)
#     password = request.json.get('password', None)

#     if not username:
#       return jsonify({"msg": "Missing username parameter"}), 400
#     if not password:
#       return jsonify({"msg": "Missing password parameter"}), 400

#     user= User.query.filter(User.username==username).one()

#     if (user.hashed_password == user.check_password_hash(password)):
#     # Identity can be any data that is json serializable
#       access_token = create_access_token(identity=username)
#       return jsonify(access_token=access_token), 200
#     else:
#       return jsonify({"msg": "Bad username or password"}), 400



#from flask_jwt_extended docs https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage/
#if we want to protect a view or api request and make sure jwt is required, do something like the following:

# Protect a view with jwt_required, which requires a valid access token
# in the request to access.
@user_routes.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

#if we want we can also put other pieces of info into the jwt in addition to the username.
