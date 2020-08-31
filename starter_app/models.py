from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

# friendship = db.Table(
#     'friendships', db.metadata,
#     db.Column('id', db.Integer, primary_key = True),
#     db.Column('user_first_id', db.Integer, db.ForeignKey('users.id'), index=True),
#     db.Column('user_second_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('status', db.Integer, default = 0),
#     db.UniqueConstraint('user_first_id', 'user_second_id', name='unique_friendships'))

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
  # friends = db.relationship('User',
  #                         secondary=friendship,
  #                         primaryjoin=id==friendship.c.user_first_id,
  #                         secondaryjoin=id==friendship.c.user_second_id,
  #                         cascade="all")
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

  # payee = db.relationship("User", foreign_keys= "Transaction.payee_id", back_populates="credit_transactions", cascade="all, delete-orphan")
  # payer = db.relationship("User", foreign_keys="Transaction.payer_id", back_populates="debit_transactions", cascade="all, delete-orphan")
  comments = db.relationship("Comment", back_populates="transaction", cascade="all, delete-orphan")
  likes = db.relationship("Like", back_populates="transaction", cascade="all, delete-orphan")

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
