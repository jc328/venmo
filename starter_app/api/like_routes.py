from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Transaction, Comment, Like
from sqlalchemy import and_, or_

like_routes = Blueprint("likes", __name__, url_prefix="/like")


@like_routes.route("/<int:transactionid>")
def change_like(transactionid):
  transaction = Transaction.query.get(transactionid)
  print(transaction, "***TRANSACTIONS***")
  # user_ids = [user_id for user_id in transaction.likers]
  # print(user_ids, "***USER_IDS***")
  # if user_id in user_ids:
  like = Like(user_id=1, transaction_id=transactionid)
  db.session.add(like)
  db.session.commit()
  print(like, "***LIKE***")
  return {"like": like}


# @transaction_routes.route("/<int:userid>")
# def get_user_transactions(userid):
#     transactions = Transaction.query.filter(or_(Transaction.payee_id == userid, Transaction.payer_id == userid), Transaction.completed == True)\
#         .order_by(Transaction.updated_at).all()
#     data = [transaction.to_dict() for transaction in transactions]
#     return {"data": data}
