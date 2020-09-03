from flask import Blueprint, jsonify, render_template, request, redirect, url_for
from starter_app.models import User
from ..models import User, db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_optional, create_access_token, get_jwt_identity, jwt_required
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf
import random

user_routes = Blueprint("user", __name__, "")

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/signup', methods=['POST'])
def sign_up():

  data = request.get_json()
  # hash = generate_password_hash(data['password'])

  try:
    user = User(
      username= f'{data["firstName"]}-{data["lastName"]}',
      first_name=data['firstName'],
      last_name=data['lastName'],
      email = data['email'],
      balance = 500)

    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()
    email = user.email
    access_token = create_access_token(identity=email)
    return {"token": access_token, "user": user.to_dict()}, 200
  except AssertionError as exception_message:
    return jsonify(msg='Error: {}. '.format(exception_message)), 400





@user_routes.route('/signin', methods=['POST'])
def sign_in():
    try:
      if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

      email = request.json.get('email', None)
      password = request.json.get('password', None)

      if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
      if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

      user= User.query.filter(User.email==email).one()

      if (user.check_password(password)):
      # if (user.hashed_password == password):
      # Identity can be any data that is json serializable
        access_token = create_access_token(identity=email)
        return {"token": access_token, "user": user.to_dict()}, 200
      else:
        return jsonify({"msg": "Bad email or password"}), 400
    except:
      return jsonify({"msg": "Bad email or password"}), 400



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
