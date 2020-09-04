from dotenv import load_dotenv
import random
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Friendship, Transaction, Like, Comment

with app.app_context():
  db.drop_all()
  db.create_all()

  #Users
  u_list = [
    User( email = "demo@zenmo.com", username = "magicalworld", hashed_password = "password", first_name = "Teresa", last_name = "Knupp",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_1.png", balance = 925.15 ),
    User( email = "RandiJVarney@teleworm.us", username = "_sightunseen_", hashed_password = "password", first_name = "Randi", last_name = "Varney",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_2.png", balance = 694.16 ),
    User( email = "CarrieRLuongo@teleworm.us", username = "_woldandmoon", hashed_password = "password", first_name = "Carrie", last_name = "Luongo",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_3.png", balance = 522.7 ),
    User( email = "DiannaBCoulter@cuvox.de", username = "032c", hashed_password = "password", first_name = "Dianna", last_name = "Coulter",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_4.png", balance = 4.28 ),
    User( email = "SharonDSchulz@armyspy.com", username = "4thandbleeker", hashed_password = "password", first_name = "Sharon", last_name = "Schulz",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_5.png", balance = 717.28 ),
    User( email = "MartaTLove@einrot.com", username = "abhorrenceo", hashed_password = "password", first_name = "Marta", last_name = "Love",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_6.png", balance = 850.51 ),
    User( email = "CynthiaDScott@rhyta.com", username = "actultracrepid", hashed_password = "password", first_name = "Cynthia", last_name = "Scott",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_7.png", balance = 13.4 ),
    User( email = "MarianneBReyes@superrito.com", username = "alagnakrisk", hashed_password = "password", first_name = "Marianne", last_name = "Reyes",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_8.png", balance = 931.2 ),
    User( email = "StaceyDEdwards@rhyta.com", username = "albertacakewalk", hashed_password = "password", first_name = "Stacey", last_name = "Edwards",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_9.png", balance = 965.05 ),
    User( email = "DoreenEHagerty@superrito.com", username = "clawnew", hashed_password = "password", first_name = "Doreen", last_name = "Hagerty",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_10.png", balance = 526.59 ),
    User( email = "AndrewMHickey@teleworm.us", username = "modularblazar", hashed_password = "password", first_name = "Andrew", last_name = "Hickey",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_11.png", balance = 37.75 ),
    User( email = "HumbertoCThoreson@cuvox.de", username = "buseagnight", hashed_password = "password", first_name = "Humberto", last_name = "Thoreson",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_12.png", balance = 873.71 ),
    User( email = "AnthonyASimon@jourrapide.com", username = "oulaings", hashed_password = "password", first_name = "Anthony", last_name = "Simon",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_13.png", balance = 102.55 ),
    User( email = "RodrigoASlayton@rhyta.com", username = "thicho", hashed_password = "password", first_name = "Rodrigo", last_name = "Slayton",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_14.png", balance = 590.34 ),
    User( email = "JamesPSimmons@fleckens.hu", username = "asciage", hashed_password = "password", first_name = "James", last_name = "Simmons",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_15.png", balance = 370.54 ),
    User( email = "TyroneCLake@gustr.com", username = "agaricest", hashed_password = "password", first_name = "Tyrone", last_name = "Lake",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_16.png", balance = 822.49 ),
    User( email = "DennisCMcBride@superrito.com", username = "ahmetrigue", hashed_password = "password", first_name = "Dennis", last_name = "McBride",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_17.png", balance = 107.78 ),
    User( email = "EarlCHubbard@superrito.com", username = "aloold", hashed_password = "password", first_name = "Earl", last_name = "Hubbard",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_18.png", balance = 178.24 ),
    User( email = "TomasMHawks@superrito.com", username = "annothing", hashed_password = "password", first_name = "Tomas", last_name = "Hawks",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_19.png", balance = 711.1 ),
    User( email = "LarryLFernandez@gustr.com", username = "begather", hashed_password = "password", first_name = "Larry", last_name = "Fernandez",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_20.png", balance = 976.23 ),
  ]

  random.shuffle(u_list)
  for u in u_list:
    db.session.add(u)
    u.set_password('P4ssword')
  db.session.commit()

  #Friendships
  users = User.query.all()
  for user1 in users:
    if random.random() < 0.67:
      for user2 in users:
        if user1.id != user2.id:
          user1.befriend(user2)
          db.session.commit()
          if random.random() < 0.8:
            user1.accept(user2)
            db.session.commit()


  #Transactions
  t_list = [
    Transaction( amount = 9.35, payee_id = 1, payer_id = 12, message = "BIRTHDAY LUNCH SPLIT", completed = False ),
    Transaction( amount = 43.51, payee_id = 4, payer_id = 17, message = "Forgot the total 🤦‍♀️", completed = True ),
    Transaction( amount = 93.46, payee_id = 2, payer_id = 10, message = "99 problems", completed = True ),
    Transaction( amount = 18.15, payee_id = 17, payer_id = 12, message = "Hair apt", completed = True ),
    Transaction( amount = 3.09, payee_id = 12, payer_id = 9, message = "Food", completed = True ),
    Transaction( amount = 83.65, payee_id = 1, payer_id = 16, message = "Thank you!", completed = True ),
    Transaction( amount = 78.26, payee_id = 16, payer_id = 5, message = "🏕", completed = True ),
    Transaction( amount = 41.2, payee_id = 18, payer_id = 1, message = "Food", completed = False ),
    Transaction( amount = 56.22, payee_id = 10, payer_id = 15, message = "Bobez", completed = False ),
    Transaction( amount = 26.11, payee_id = 7, payer_id = 20, message = "New hair 😍", completed = False ),
    Transaction( amount = 19.37, payee_id = 15, payer_id = 17, message = "⛳ 🍕", completed = False ),
    Transaction( amount = 47.9, payee_id = 4, payer_id = 5, message = "IKEA", completed = True ),
    Transaction( amount = 5.04, payee_id = 1, payer_id = 17, message = "Waba", completed = False ),
    Transaction( amount = 94.4, payee_id = 17, payer_id = 20, message = "Tacos 🌮", completed = True ),
    Transaction( amount = 24.09, payee_id = 6, payer_id = 19, message = "Boiling crab", completed = False ),
    Transaction( amount = 30.77, payee_id = 6, payer_id = 19, message = "⛵", completed = False ),
    Transaction( amount = 27.56, payee_id = 14, payer_id = 10, message = "Shipping", completed = True ),
    Transaction( amount = 5.57, payee_id = 4, payer_id = 17, message = "🌯", completed = True ),
    Transaction( amount = 61.53, payee_id = 11, payer_id = 19, message = "Gas", completed = False ),
    Transaction( amount = 87.59, payee_id = 7, payer_id = 3, message = "Dinner", completed = True ),
    Transaction( amount = 1.28, payee_id = 19, payer_id = 6, message = "💵", completed = True ),
    Transaction( amount = 68.45, payee_id = 1, payer_id = 10, message = "Support your local small business ✨", completed = False ),
    Transaction( amount = 13.14, payee_id = 13, payer_id = 20, message = "Poke plus the rest of the Vons bbq stuff", completed = False ),
    Transaction( amount = 38.21, payee_id = 9, payer_id = 1, message = "Thank you!", completed = False ),
    Transaction( amount = 50.13, payee_id = 3, payer_id = 13, message = "Groceries", completed = False ),
    Transaction( amount = 57.44, payee_id = 19, payer_id = 16, message = "Me eating my food", completed = False ),
    Transaction( amount = 87.92, payee_id = 6, payer_id = 1, message = "😘😘😘", completed = False ),
    Transaction( amount = 43.3, payee_id = 6, payer_id = 11, message = "Misc", completed = False ),
    Transaction( amount = 62.2, payee_id = 8, payer_id = 17, message = "🥙🍨", completed = True ),
    Transaction( amount = 51.97, payee_id = 5, payer_id = 15, message = "Groceries, gas", completed = False ),
    Transaction( amount = 91.92, payee_id = 8, payer_id = 2, message = "🍾", completed = True ),
    Transaction( amount = 25.4, payee_id = 6, payer_id = 13, message = "Sofa", completed = False ),
    Transaction( amount = 14.3, payee_id = 2, payer_id = 13, message = "TV", completed = False ),
    Transaction( amount = 1.69, payee_id = 8, payer_id = 9, message = "🥧🍔", completed = True ),
    Transaction( amount = 23.73, payee_id = 1, payer_id = 9, message = "🍣", completed = False ),
    Transaction( amount = 83.82, payee_id = 16, payer_id = 14, message = "Yosemite🏕🧡🚗", completed = True ),
    Transaction( amount = 10.51, payee_id = 5, payer_id = 1, message = "Jewelry ✨", completed = False ),
    Transaction( amount = 14.23, payee_id = 7, payer_id = 2, message = "Comida 🤓", completed = False ),
    Transaction( amount = 31.08, payee_id = 15, payer_id = 18, message = "Big 🐻", completed = False ),
    Transaction( amount = 22.28, payee_id = 20, payer_id = 15, message = "Other stuff", completed = True ),
    Transaction( amount = 23.68, payee_id = 4, payer_id = 10, message = "Stuff", completed = False ),
    Transaction( amount = 78.76, payee_id = 10, payer_id = 11, message = "Fried chicken", completed = False ),
    Transaction( amount = 87.33, payee_id = 8, payer_id = 6, message = "Pizzzaaa", completed = False ),
    Transaction( amount = 96.71, payee_id = 8, payer_id = 11, message = "Thank you 🙏", completed = True ),
    Transaction( amount = 57.06, payee_id = 3, payer_id = 13, message = "🍕", completed = False ),
    Transaction( amount = 70.39, payee_id = 14, payer_id = 11, message = "Massage 💆 🙏🏽", completed = True ),
    Transaction( amount = 49.59, payee_id = 1, payer_id = 13, message = "Dimes🥳", completed = True ),
    Transaction( amount = 24.77, payee_id = 5, payer_id = 19, message = "lunch", completed = False ),
    Transaction( amount = 22.49, payee_id = 3, payer_id = 13, message = "dum sum", completed = False ),
    Transaction( amount = 12.35, payee_id = 1, payer_id = 14, message = "Bday weekend things 🎉", completed = True ),
    Transaction( amount = 50.16, payee_id = 13, payer_id = 20, message = "BIRTHDAY LUNCH SPLIT", completed = False ),
    Transaction( amount = 15.68, payee_id = 15, payer_id = 14, message = "Forgot the total 🤦‍♀️", completed = True ),
    Transaction( amount = 91.54, payee_id = 11, payer_id = 8, message = "100 problems", completed = True ),
    Transaction( amount = 54.38, payee_id = 4, payer_id = 20, message = "Hair apt", completed = False ),
    Transaction( amount = 55.26, payee_id = 2, payer_id = 6, message = "Food", completed = False ),
    Transaction( amount = 28.18, payee_id = 19, payer_id = 8, message = "Thank you!", completed = False ),
    Transaction( amount = 53.11, payee_id = 17, payer_id = 14, message = "🏕", completed = True ),
    Transaction( amount = 74.03, payee_id = 6, payer_id = 2, message = "Food", completed = False ),
    Transaction( amount = 52.12, payee_id = 10, payer_id = 12, message = "Bobez", completed = False ),
    Transaction( amount = 30.84, payee_id = 1, payer_id = 8, message = "New hair 😍", completed = False ),
    Transaction( amount = 71.39, payee_id = 12, payer_id = 8, message = "⛳ 🍕", completed = False ),
    Transaction( amount = 41.28, payee_id = 8, payer_id = 17, message = "IKEA", completed = False ),
    Transaction( amount = 40.59, payee_id = 15, payer_id = 20, message = "Waba", completed = True ),
    Transaction( amount = 35.54, payee_id = 9, payer_id = 4, message = "Tacos 🌮", completed = False ),
    Transaction( amount = 8.44, payee_id = 12, payer_id = 3, message = "Boiling crab", completed = True ),
    Transaction( amount = 94.87, payee_id = 15, payer_id = 10, message = "⛵", completed = False ),
    Transaction( amount = 95.69, payee_id = 2, payer_id = 5, message = "Shipping", completed = False ),
    Transaction( amount = 15.64, payee_id = 15, payer_id = 6, message = "🌯", completed = False ),
    Transaction( amount = 18.88, payee_id = 16, payer_id = 18, message = "Gas", completed = True ),
    Transaction( amount = 2.7, payee_id = 11, payer_id = 19, message = "Dinner", completed = True ),
    Transaction( amount = 93.15, payee_id = 8, payer_id = 9, message = "💵", completed = True ),
    Transaction( amount = 44.33, payee_id = 9, payer_id = 17, message = "Support your local small business ✨", completed = False ),
    Transaction( amount = 34.14, payee_id = 7, payer_id = 10, message = "Poke plus the rest of the Vons bbq stuff", completed = True ),
    Transaction( amount = 26.96, payee_id = 3, payer_id = 7, message = "Thank you!", completed = False ),
    Transaction( amount = 34.05, payee_id = 10, payer_id = 1, message = "Groceries", completed = False ),
    Transaction( amount = 71.99, payee_id = 15, payer_id = 12, message = "Me eating my food", completed = False ),
    Transaction( amount = 28.3, payee_id = 8, payer_id = 5, message = "😘😘😘", completed = False ),
    Transaction( amount = 54.79, payee_id = 11, payer_id = 10, message = "Misc", completed = True ),
    Transaction( amount = 64.58, payee_id = 8, payer_id = 10, message = "🥙🍨", completed = False ),
    Transaction( amount = 79.61, payee_id = 2, payer_id = 13, message = "Groceries, gas", completed = True ),
    Transaction( amount = 69.78, payee_id = 12, payer_id = 13, message = "🍾", completed = False ),
    Transaction( amount = 1.62, payee_id = 7, payer_id = 20, message = "Sofa", completed = True ),
    Transaction( amount = 39.55, payee_id = 13, payer_id = 2, message = "TV", completed = True ),
    Transaction( amount = 57.92, payee_id = 14, payer_id = 13, message = "🥧🍔", completed = True ),
    Transaction( amount = 46.72, payee_id = 3, payer_id = 12, message = "🍣", completed = True ),
    Transaction( amount = 38.51, payee_id = 1, payer_id = 5, message = "Yosemite🏕🧡🚗", completed = True ),
    Transaction( amount = 88.13, payee_id = 20, payer_id = 5, message = "Jewelry ✨", completed = False ),
    Transaction( amount = 63.55, payee_id = 15, payer_id = 20, message = "Comida 🤓", completed = True ),
    Transaction( amount = 17.46, payee_id = 20, payer_id = 4, message = "Big 🐻", completed = True ),
    Transaction( amount = 65.24, payee_id = 12, payer_id = 5, message = "Other stuff", completed = True ),
    Transaction( amount = 18.21, payee_id = 6, payer_id = 14, message = "Stuff", completed = False ),
    Transaction( amount = 8.47, payee_id = 8, payer_id = 20, message = "Fried chicken", completed = False ),
    Transaction( amount = 79.33, payee_id = 8, payer_id = 7, message = "BIRTHDAY LUNCH SPLIT", completed = True ),
    Transaction( amount = 73.7, payee_id = 2, payer_id = 18, message = "Forgot the total 🤦‍♀️", completed = False ),
    Transaction( amount = 42.67, payee_id = 19, payer_id = 20, message = "100 problems", completed = False ),
    Transaction( amount = 9.61, payee_id = 7, payer_id = 15, message = "Hair apt", completed = True ),
    Transaction( amount = 99.82, payee_id = 17, payer_id = 6, message = "Food", completed = True ),
    Transaction( amount = 55.54, payee_id = 1, payer_id = 20, message = "Thank you!", completed = True ),
    Transaction( amount = 8.69, payee_id = 17, payer_id = 15, message = "BIRTHDAY LUNCH SPLIT", completed = True ),
    Transaction( amount = 45.77, payee_id = 11, payer_id = 1, message = "Forgot the total 🤦‍♀️", completed = False ),
  ]

  random.shuffle(t_list)
  for t in t_list:
    db.session.add(t)
  db.session.commit()

  #Likes
  l_list = []
  for t in range(100):
    for u in range(20):
      if random.random() < 0.2:
        l_list.append(Like(user_id = u + 1, transaction_id = t + 1))

  for l in l_list:
    db.session.add(l)
  db.session.commit()

  #Comments
  payee_comment_options = [ "thanks!", "awesome!", "you're the best", "until next time...", "wooo", "wooot thx!", "cant wait till the time", "another one", "thx lets do this again!", "always a pleasure", "always count on you", "next one is on me", "pleasure doing business with ya", "thank you", "thank you very much", "you didnt have to but ok hehe", "merci", "gracias", "xie xie", "THANK YOU!!!", "party time!", "party city", "so worth it", "word", "thats whats up", "can always count of you"]
  payer_comment_options = [ "for sure!", "always.", "yes", "word", "yup", "YUP", "heh", "already planning the next one", "next time will be nutz", "always down", "YOLO", ":D", ":-P","still taking donations... hehe", "we unstoppable!", "YASSSSS", "no, thank you!", "I got you yo!"]
  c_list = []
  for t in range(100):
    if random.random() < 0.8:
      trans_post = Transaction.query.get(t + 1)
      c_list.append(Comment(message = random.choice(payer_comment_options), transaction_id = t + 1, user_id = trans_post.payer_id))
      if random.random() < 0.8:
        c_list.append(Comment(message = random.choice(payee_comment_options), transaction_id = t + 1, user_id = trans_post.payee_id))

  for c in c_list:
    db.session.add(c)
  db.session.commit()
