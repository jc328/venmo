from flask import Blueprint, jsonify, request
from app.models import db, User, Transaction, Comment, Like
from sqlalchemy import and_, or_

like_routes = Blueprint("likes", __name__, url_prefix="/like")


@like_routes.route("/<int:transactionid>/<int:userid>")
def heart(transactionid, userid):
  like = Like(user_id=userid, transaction_id=transactionid)
  db.session.add(like)
  db.session.commit()
  data = like.to_dict()
  return {"data": data}


@like_routes.route("/unlike/<int:transactionid>/<int:userid>")
def unheart(transactionid, userid):
  like = Like.query.filter(Like.user_id==userid, Like.transaction_id==transactionid).first()
  data = like.to_dict()
  db.session.delete(like)
  db.session.commit()
  return {"data": data}
