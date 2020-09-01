from flask import Blueprint, jsonify, render_template, request
from starter_app.models import User
from ..models import User, db

user_routes = Blueprint("user", __name__, "")

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/signup', methods=['POST'])
def signup():
  data = request.get_json()
  # print(data)
  return jsonify(data)
