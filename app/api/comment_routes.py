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
    data = request.json
    comment = Comment(**data)
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict(), 200

#Route to delete a comment
# request json example = {"comment_id": comment id}
@comment_routes.route("/delete/<int:transactionid>/<int:userid>")
def delete_comment(transactionid, userid):
    # like = Like.query.filter(Like.user_id==userid, Like.transaction_id==transactionid).first()
    comment = Comment.query.filter(Comment.user_id==userid, Comment.transaction_id==transactionid).first()
    db.session.delete(comment)
    db.session.commit()
    return {"msg": "comment deleted"}, 200
