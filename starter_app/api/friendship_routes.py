from flask import Blueprint, jsonify, request
from starter_app.models import db, User, Transaction, Comment, Like, Friendship
from sqlalchemy import and_, or_

friendship_routes = Blueprint("friends", __name__, url_prefix="/friends")

#Route to get all friends
'''only need user_id in request.json:
{
    "user_id": id (get this from authentication.user.id in redux store)
}
'''
@friendship_routes.route('')
def get_friends():
    data = request.json
    user = User.query.get(data["user_id"])
    all= user.friends
    complete_friends = Friendship.query.filter(Friendship.user_first_id==user.id, Friendship.status==1).all()
    ids = [friendship.user_second_id for friendship in complete_friends]
    friend_info = [friend.censored_dict() for friend in all if (friend.id in ids)]
    return {"data": friend_info}, 200


#Route to get all pending friend requests to user
'''only need user_id in request.json:
{
    "user_id": id (get this from authentication.user.id in redux store)
}
'''
@friendship_routes.route('/requests')
def get_requests():
    data = request.json
    user = User.query.get(data["user_id"])
    all= user.friends
    pending_friends = Friendship.query.filter(Friendship.user_second_id==user.id, Friendship.status==0).all()
    ids = [friendship.user_first_id for friendship in pending_friends]
    friend_info = [friend.censored_dict() for friend in all if (friend.id in ids)]
    return {"data": friend_info}, 200

#Route to send friend
''' request json should look like this:
{
    "user_id": id (get this from authentication.user.id in redux store),
    "friend_id": id of person they want to befriend
}
'''
@friendship_routes.route('/add', methods=['POST'])
def send_request():
    data = request.json
    user = User.query.get(data["user_id"])
    pfriend = User.query.get(data["friend_id"])

    if pfriend in user.friends:
        return {"msg": "This person is already your friend, or you've already sent them a request"}, 400
    else:
        request1 = Friendship(
            user_first_id=data["user_id"],
            user_second_id=data["friend_id"],
            status=0)
        request2 = Friendship(
            user_first_id=data["friend_id"],
            user_second_id=data["user_id"],
            status=1)

    db.session.add(request1)
    db.session.add(request2)
    db.session.commit()
    return {"msg": "Friend request sent!"}, 200

#Route to accept friend request
''' request json should look like this:
{
    "user_id": id (get this from authentication.user.id in redux store),
    "friend_id": id of person that sent incoming request
}
'''
@friendship_routes.route('/accept', methods=['POST'])
def accept_friend():
    data = request.json
    friendship = Friendship.query.filter(Friendship.user_first_id==data["friend_id"], Friendship.user_second_id==data["user_id"]).one()
    db.session.add(friendship)
    friendship.status = 1
    db.session.commit()
    return {"msg": "Friend accepted!"}, 200

#Route to remove friend
''' request json should look like this:
{
    "user_id": id (get this from authentication.user.id in redux store),
    "friend_id": id of friend to remove
}
'''
@friendship_routes.route('/remove', methods=['POST'])
def remove_friend():
    data=request.json
    relationships = Friendship.query.filter(or_(and_(Friendship.user_first_id == data["user_id"], Friendship.user_second_id == data["friend_id"]), \
        and_(Friendship.user_second_id == data["user_id"], Friendship.user_first_id == data["friend_id"]))).all()
    for row in relationships:
        db.session.delete(row)
    db.session.commit()
    return{"msg": "Friend removed"}, 200
