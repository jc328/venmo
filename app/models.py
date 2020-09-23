from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import re

db = SQLAlchemy()

class Friendship(db.Model):
    __tablename__= "friendships"
    id= db.Column(db.Integer, primary_key = True)
    user_first_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
    user_second_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.Integer, default = 0)
    db.UniqueConstraint('user_first_id', 'user_second_id', name='unique_friendships')


class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String, nullable = False)
  picUrl = db.Column(db.String)
  balance = db.Column(db.Numeric(9,2))
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  credit_transactions = db.relationship("Transaction", foreign_keys= "Transaction.payee_id", backref="payee", cascade="all, delete-orphan", lazy="dynamic")
  debit_transactions = db.relationship("Transaction", foreign_keys="Transaction.payer_id", backref="payer", cascade="all, delete-orphan", lazy="dynamic")
  comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
  likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")


  friends = db.relationship('User',
                          secondary=Friendship.__table__,
                          primaryjoin=id==Friendship.user_first_id,
                          secondaryjoin=id==Friendship.user_second_id,
                          cascade="all")
  
  def has_friends(self):
    return len(self.friends) > 0

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "email": self.email,
      "picUrl": self.picUrl,
      "balance": float(self.balance),
      "has_friends": self.has_friends()
    }

  def befriend(self, friend):
      if friend not in self.friends:
          self.friends.append(friend)
          friend.friends.append(self)

  def censored_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "full_name": self.first_name + " " + self.last_name,
      "picUrl": self.picUrl,
    }

  def unfriend(self, friend):
      if friend in self.friends:
          self.friends.remove(friend)
          friend.friends.remove(self)

  @validates('email')
  def validate_email(self, key, email):
    if User.query.filter(User.email==email).first():
      raise AssertionError('Email already in use')

    if not re.match("[^@]+@[^@]+\.[^@]+", email):
      raise AssertionError('Provided email is not an email address')

    return email

  @property
  def password(self):
      return self.hashed_password

  def set_password(self, password):
      if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
          raise AssertionError('Password must contain 1 capital letter and 1 number')
      if len(password) < 8 or len(password) > 50:
          raise AssertionError('Password must be between 8 and 50 characters')
      self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password, password)

  def accept(self, friend):
    if friend in self.friends:
      user1_friendship = Friendship.query.filter(Friendship.user_first_id == friend.id, Friendship.user_second_id == self.id).one()
      user2_friendship = Friendship.query.filter(Friendship.user_first_id == self.id, Friendship.user_second_id == friend.id).one()
      user1_friendship.status = 1
      user2_friendship.status = 1
    

class Transaction(db.Model):
  __tablename__='transactions'

  id = db.Column(db.Integer, primary_key = True)
  privacy = db.Column(db.Integer, default=0)
  amount = db.Column(db.Numeric(9,2), nullable = False)
  payee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  payer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  message = db.Column(db.String(300))
  completed = db.Column(db.Boolean, nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  #Users table uses backref to payer/payee. So you can query Transaction.payer.username to see the name of the person paying.
  comments = db.relationship("Comment", back_populates="transaction", cascade="all, delete-orphan")
  likes = db.relationship("Like", back_populates="transaction", cascade="all, delete-orphan")

  def likers_full(self):
    likers_list = []
    for like in self.likes:
      user_values = {
                    "user_id": like.user_id, 
                    "user_full_name": (like.user.first_name + ' ' + like.user.last_name), 
                    "transaction_id": like.transaction_id,
                    }
      likers_list.append(user_values)
    return likers_list
  
  def comments_full(self):
    comments_list = []
    for comment in self.comments:
      comment_values = {
        "id": comment.id,
        "user_id": comment.user_id, 
        "user_full_name": (comment.user.first_name + ' ' + comment.user.last_name),
        "user_pic": comment.user.picUrl, 
        "transaction_id": comment.transaction_id, 
        "message": comment.message, 
        "created_at": comment.created_at,
        "updated_at": comment.updated_at,
      }
      comments_list.append(comment_values)
    return comments_list
  
  def friend_ids(self):
    friends_list = [ friend.id for friend in self.payee.friends ] + [ friend.id for friend in self.payer.friends ]
    return friends_list

  def to_dict(self):
    return {
      "id": self.id,
      "privacy": self.privacy,
      "amount": float(self.amount),
      "payee_id": self.payee.id,
      "payee_full_name": (self.payee.first_name + ' ' + self.payee.last_name),
      "payee_pic": self.payee.picUrl,
      "payer_id": self.payer.id,
      "payer_full_name": (self.payer.first_name + ' ' + self.payer.last_name),
      "payer_pic": self.payer.picUrl,
      "message": self.message,
      "completed": self.completed,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "likers_full": self.likers_full(),
      "comments_full": self.comments_full(),
      "friend_ids": self.friend_ids()
    }

class Comment(db.Model):
  __tablename__='comments'

  id = db.Column(db.Integer, primary_key = True)
  message = db.Column(db.String(300), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  user = db.relationship("User", back_populates="comments")
  transaction = db.relationship("Transaction", back_populates="comments")
  likes = db.relationship("Like", back_populates="comment", cascade="all, delete-orphan")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "transaction_id": self.transaction_id,
      "message": self.message,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
    }

class Like(db.Model):
  __tablename__='likes'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"))
  transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  user = db.relationship("User", back_populates="likes")
  transaction = db.relationship("Transaction", back_populates="likes")
  comment = db.relationship("Comment", back_populates="likes")
  
  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "transaction_id": self.transaction_id,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
    }
