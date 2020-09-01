from flask import Blueprint, jsonify, render_template
from starter_app.models import User

user_routes = Blueprint("user", __name__, "")

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/signup')
def signup():
  return 'Hello'
