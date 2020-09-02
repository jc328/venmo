from flask_sqlalchemy import SQLAlchemy
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Friendship(db.Model):
    __tablename__= "friendships"
    id= db.Column(db.Integer, primary_key = True)
    user_first_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
    user_second_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.Integer, default = 0)
    db.UniqueConstraint('user_first_id', 'user_second_id', name='unique_friendships')

# Status codes: 0=pending, 1=accepted
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

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }

  def befriend(self, friend):
      if friend not in self.friends:
          self.friends.append(friend)
          friend.friends.append(self)

  def unfriend(self, friend):
      if friend in self.friends:
          self.friends.remove(friend)
          friend.friends.remove(self)

  @property
  def password(self):
      return self.hashed_password

  @password.setter
  def password(self, password):
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

  def to_dict(self):
    return {
      "id": self.id,
      "amount": self.amount,
      "payee": self.payee.id, #id as placeholder for now, may want to change to username or something else later
      "payer": self.payer.id,
      "message": self.message,
      "completed": self.completed,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }

class Comment(db.Model):
  __tablename__='comments'

  id = db.Column(db.Integer, primary_key = True)
  message = db.Column(db.String(300), nullable = False)
  transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  user = db.relationship("User", back_populates="comments")
  transaction = db.relationship("Transaction", back_populates="comments")
  likes = db.relationship("Like", back_populates="comment", cascade="all, delete-orphan")

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
