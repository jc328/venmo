import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager


from starter_app.models import db, User, Friendship, Transaction, Comment, Like
from starter_app.api.user_routes import user_routes
from starter_app.api.transaction_routes import transaction_routes
from starter_app.api.like_routes import like_routes

from starter_app.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(user_routes)
app.register_blueprint(transaction_routes)
app.register_blueprint(like_routes)
db.init_app(app)
migrate = Migrate(app, db)

## Application Security
jwt = JWTManager(app)
CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
