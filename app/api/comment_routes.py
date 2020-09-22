from flask import Blueprint, jsonify, request
from app.models import db, User, Transaction, Comment, Like, Friendship
from sqlalchemy import and_, or_

comment_routes = Blueprint("comments", __name__, url_prefix="/comment")

#Route to add comment to a transaction
'''request json example:
{
    "transaction_id": id,
    "message": "message",
    "user_id: user id
}
'''
@comment_routes.route('', methods=["POST"])
def add_comment():
    data= request.json
    transaction = Transaction.query.get(data["transaction_id"])

    comment = Comment(
        message=data["message"],
        transaction_id= transaction.id,
        user_id=data["user_id"]
    )
    db.session.add(transaction)
    transaction.comments.append(comment)
    db.session.commit()
    response = [comment.to_dict() for comment in transaction.comments]
    return {"data": response}, 200

#Route to delete a comment
# request json example = {"comment_id": comment id}
@comment_routes.route('/delete', methods=["POST"])
def delete_comment():
    data = request.json
    comment = Comment.query.get(data["comment_id"])
    db.session.delete(comment)
    db.session.commit()
    return {"msg": "comment deleted"}, 200
