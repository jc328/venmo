from dotenv import load_dotenv
from alembic import op
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Friendship, Transaction, Like, Comment

# with app.app_context():
#   db.drop_all()
#   db.create_all()

# #   # users =[el(User(username = el.username, email = el.email)) for el in array]

#   ian = User(username = 'Ian', first_name = "ian", last_name = "bentley", email = 'ian@aa.io', hashed_password = "jdsaojcvaoewifjoaweif", picUrl= "", balance = 100)
#   ian2 = User(username = 'Ian2', first_name = "ian", last_name = "bentley", email = 'ian2@aa.io', hashed_password = "jdsaojcvaoewifjoaweif", picUrl= "", balance = 100)
#   ian3 = User(username = 'Ian3', first_name = "ian", last_name = "bentley", email = 'ian3@aa.io', hashed_password = "jdsaojcvaoewifjoaweif", picUrl= "", balance = 100)
#   # # javier = User(username = 'Javier', email = 'javier@aa.io')
#   # # dean = User(username = 'Dean', email = 'dean@aa.io')
#   # # angela = User(username = 'Angela', email = 'angela@aa.io')
#   # # soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io')
#   # # alissa = User(username = 'Alissa', email = 'alissa@aa.io')

#   # # db.session.add(ian)
#   # # db.session.add(javier)
#   # # db.session.add(dean)
#   # # db.session.add(angela)
#   # # db.session.add(soonmi)
#   db.session.add(ian)
#   db.session.add(ian2)
#   db.session.add(ian3)

# #   # db.session.add(users)
#   db.session.commit()
with app.app_context():
  # findian = User.query.get(1)
  # findian2 = User.query.get(2)
  # findian3 = User.query.get(3)

  gettransaction2 = Transaction.query.get(2)
  print(gettransaction2.to_dict())
  # names = [(like.user.first_name) for like in gettransaction2.likes]
  # print(names)
  # for like in getlikes2.likes:
  #   print(like.user.first_name)


#   findianfreq = Friendship.query.filter(Friendship.user_second_id==findian.id, Friendship.status==0).all()
#   print(findianfreq, "frequests here")

  # for friend in findianfreq:
  #   print(friend.status)
  #   db.session.add(friend)
  #   friend.status = 1
  #   db.session.commit()
  #   print(friend.status)


  # print(findian.friends, 'friends here')
  # print([friend.id for friend in findian.friends])
  # print(2 in [friend.id for friend in findian.friends])
  # for friend in findian.friends:
  #   print(friend.id)

  # db.session.add(findian)
  # findian.befriend(findian2)
  # findian.befriend(findian3)
  # db.session.commit()

  # newtransaction = Transaction(amount= 20, payee_id= 1, payer_id= 2, message= "a debt repaid", completed= True)
  # db.session.add(newtransaction)
  # findian.credit_transactions.append(newtransaction)
  # findian.save()

  # db.session.commit()

  # findiantrans = findian.credit_transactions
  # for transaction in findiantrans:
  #   print(transaction.payer.username)
