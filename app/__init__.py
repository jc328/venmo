import os
from flask import Flask, render_template, request, session, jsonify
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt


from app.models import db, User, Friendship, Transaction, Comment, Like
from app.api.user_routes import user_routes
from app.api.transaction_routes import transaction_routes
from app.api.like_routes import like_routes
from app.api.comment_routes import comment_routes
from app.api.friendship_routes import friendship_routes

from app.config import Config

app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
app.register_blueprint(user_routes)
app.register_blueprint(transaction_routes)
app.register_blueprint(like_routes)
app.register_blueprint(comment_routes)
app.register_blueprint(friendship_routes)
db.init_app(app)
migrate = Migrate(app, db)

## Application Security
jwt = JWTManager(app)
blacklist=set()

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist

@app.route('/logout', methods=["DELETE"])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200

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
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
