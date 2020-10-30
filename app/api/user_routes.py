from flask import Blueprint, jsonify, render_template, request, redirect, url_for, current_app
from app.models import User
from ..models import User, db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_optional, create_access_token, get_jwt_identity, jwt_required, get_raw_jwt
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf
import random

user_routes = Blueprint("user", __name__, "")

@user_routes.route("/google-credentials")
def get_google_credentials():
  client_id = current_app.config['GOOGLE_CLIENT_ID']
  api_key = current_app.config['GOOGLE_API_KEY']
  return {'client_id': client_id, 'api_key': api_key}, 200

@user_routes.route('/allusers', methods=['POST'])
def allusers():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/signup', methods=['POST'])
def sign_up():
  data = request.get_json()
  hash = generate_password_hash(data['password'])

  try:
    user = User(
      username= f'{data["firstName"]}-{data["lastName"]}',
      first_name=data['firstName'],
      last_name=data['lastName'],
      email=data['email'],
      hashed_password=hash,
      picUrl=data['picture'],
      balance = 500)

    db.session.add(user)
    db.session.commit()
    email = user.email
    access_token = create_access_token(identity=email)
    return {"token": access_token, "user": user.to_dict()}, 200
  except AssertionError as exception_message:
    return jsonify(msg='Error: {}. '.format(exception_message)), 400
  

@user_routes.route('/signup-google', methods=['POST'])
def sign_up_google():
  data = request.get_json()
  hash = generate_password_hash(data['email'])
  try:
    user = User(
        username=f'{data["firstName"]}-{data["lastName"]}',
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        hashed_password=hash,
        picUrl=data['picture'],
        balance=500
    )
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
        access_token = create_access_token(identity=email)
        return {"token": access_token, "user": user.to_dict()}, 200
      else:
        return jsonify({"msg": "Bad email or password"}), 400
    except:
      return jsonify({"msg": "Bad email or password"}), 400


@user_routes.route('/signin-google', methods=['POST'])
def sign_in_google():
    try:
      if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

      email = request.json.get('email', None)

      if not email:
        return jsonify({"msg": "Missing email parameter"}), 400

      user = User.query.filter(User.email == email).one()
      access_token = create_access_token(identity=email)
      return {"token": access_token, "user": user.to_dict()}, 200
    except:
      return jsonify({"msg": "Google account not found.  Please sign up."}), 400
