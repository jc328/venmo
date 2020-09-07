from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Friendship, Transaction, Like, Comment

with app.app_context():
  db.drop_all()
  db.create_all()

  #Users
  u_list = [
    User( email = "demo@zenmo.com", username = "magicalworld", hashed_password = "password", first_name = "Teresa", last_name = "Knupp",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_1.png", balance = 925.15, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "RandiJVarney@teleworm.us", username = "_sightunseen_", hashed_password = "password", first_name = "Randi", last_name = "Varney",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_2.png", balance = 694.16, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "CarrieRLuongo@teleworm.us", username = "_woldandmoon", hashed_password = "password", first_name = "Carrie", last_name = "Luongo",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_3.png", balance = 522.7, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "DiannaBCoulter@cuvox.de", username = "032c", hashed_password = "password", first_name = "Dianna", last_name = "Coulter",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_4.png", balance = 4.28, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "SharonDSchulz@armyspy.com", username = "4thandbleeker", hashed_password = "password", first_name = "Sharon", last_name = "Schulz",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_5.png", balance = 717.28, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "MartaTLove@einrot.com", username = "abhorrenceo", hashed_password = "password", first_name = "Marta", last_name = "Love",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_6.png", balance = 850.51, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "CynthiaDScott@rhyta.com", username = "actultracrepid", hashed_password = "password", first_name = "Cynthia", last_name = "Scott",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_7.png", balance = 13.4, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "MarianneBReyes@superrito.com", username = "alagnakrisk", hashed_password = "password", first_name = "Marianne", last_name = "Reyes",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_8.png", balance = 931.2, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "StaceyDEdwards@rhyta.com", username = "albertacakewalk", hashed_password = "password", first_name = "Stacey", last_name = "Edwards",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_9.png", balance = 965.05, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "DoreenEHagerty@superrito.com", username = "clawnew", hashed_password = "password", first_name = "Doreen", last_name = "Hagerty",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_10.png", balance = 526.59, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "AndrewMHickey@teleworm.us", username = "modularblazar", hashed_password = "password", first_name = "Andrew", last_name = "Hickey",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_11.png", balance = 37.75, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "HumbertoCThoreson@cuvox.de", username = "buseagnight", hashed_password = "password", first_name = "Humberto", last_name = "Thoreson",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_12.png", balance = 873.71, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "AnthonyASimon@jourrapide.com", username = "oulaings", hashed_password = "password", first_name = "Anthony", last_name = "Simon",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_13.png", balance = 102.55, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "RodrigoASlayton@rhyta.com", username = "thicho", hashed_password = "password", first_name = "Rodrigo", last_name = "Slayton",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_14.png", balance = 590.34, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "JamesPSimmons@fleckens.hu", username = "asciage", hashed_password = "password", first_name = "James", last_name = "Simmons",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_15.png", balance = 370.54, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "TyroneCLake@gustr.com", username = "agaricest", hashed_password = "password", first_name = "Tyrone", last_name = "Lake",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_16.png", balance = 822.49, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "DennisCMcBride@superrito.com", username = "ahmetrigue", hashed_password = "password", first_name = "Dennis", last_name = "McBride",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_17.png", balance = 107.78, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "EarlCHubbard@superrito.com", username = "aloold", hashed_password = "password", first_name = "Earl", last_name = "Hubbard",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_18.png", balance = 178.24, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "TomasMHawks@superrito.com", username = "annothing", hashed_password = "password", first_name = "Tomas", last_name = "Hawks",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_19.png", balance = 711.1, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "LarryLFernandez@gustr.com", username = "begather", hashed_password = "password", first_name = "Larry", last_name = "Fernandez",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_20.png", balance = 976.23, created_at = datetime.now() - timedelta(days = 370) ),
  ]

  random.shuffle(u_list)
  for u in u_list:
    db.session.add(u)
    u.set_password('P4ssword')
  db.session.commit()

  #Friendships
  users = User.query.all()
  for user1 in users:
    for user2 in users:
      if user1.id != user2.id:
        if random.random() < 0.2:
          user1.befriend(user2)
          db.session.commit()
          if random.random() < 0.8:
            user1.accept(user2)
            db.session.commit()


  #Transactions
  t_list = [
    Transaction( privacy = 0, amount = 9.35, payee_id = 1, payer_id = 12, message = "BIRTHDAY LUNCH SPLIT", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 43.51, payee_id = 4, payer_id = 17, message = "Forgot the total 🤦‍♀️", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 93.46, payee_id = 2, payer_id = 10, message = "99 problems", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 18.15, payee_id = 17, payer_id = 12, message = "Hair apt", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 3.09, payee_id = 12, payer_id = 9, message = "Food", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 83.65, payee_id = 1, payer_id = 16, message = "Thank you!", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 78.26, payee_id = 16, payer_id = 5, message = "🏕", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 41.2, payee_id = 18, payer_id = 1, message = "Food", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 56.22, payee_id = 10, payer_id = 15, message = "Bobez", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 26.11, payee_id = 7, payer_id = 20, message = "New hair 😍", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 19.37, payee_id = 15, payer_id = 17, message = "⛳ 🍕", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 47.9, payee_id = 4, payer_id = 5, message = "IKEA", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 5.04, payee_id = 1, payer_id = 17, message = "Waba", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 94.4, payee_id = 17, payer_id = 20, message = "Tacos 🌮", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 24.09, payee_id = 6, payer_id = 19, message = "Boiling crab", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 30.77, payee_id = 6, payer_id = 19, message = "⛵", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 27.56, payee_id = 14, payer_id = 10, message = "Shipping", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 5.57, payee_id = 4, payer_id = 17, message = "🌯", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 61.53, payee_id = 11, payer_id = 19, message = "Gas", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 87.59, payee_id = 7, payer_id = 3, message = "Dinner", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 1.28, payee_id = 19, payer_id = 6, message = "💵", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 68.45, payee_id = 1, payer_id = 10, message = "Support your local small business ✨", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 13.14, payee_id = 13, payer_id = 20, message = "Poke plus the rest of the Vons bbq stuff", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 38.21, payee_id = 9, payer_id = 1, message = "Thank you!", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 50.13, payee_id = 3, payer_id = 13, message = "Groceries", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 57.44, payee_id = 19, payer_id = 16, message = "Me eating my food", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 87.92, payee_id = 6, payer_id = 1, message = "😘😘😘", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 43.3, payee_id = 6, payer_id = 11, message = "Misc", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 62.2, payee_id = 8, payer_id = 17, message = "🥙🍨", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 51.97, payee_id = 5, payer_id = 15, message = "Groceries, gas", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 91.92, payee_id = 8, payer_id = 2, message = "🍾", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 25.4, payee_id = 6, payer_id = 13, message = "Sofa", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 14.3, payee_id = 2, payer_id = 13, message = "TV", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 1.69, payee_id = 8, payer_id = 9, message = "🥧🍔", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 23.73, payee_id = 1, payer_id = 9, message = "🍣", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 83.82, payee_id = 16, payer_id = 14, message = "Yosemite🏕🧡🚗", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 10.51, payee_id = 5, payer_id = 1, message = "Jewelry ✨", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 14.23, payee_id = 7, payer_id = 2, message = "Comida 🤓", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 31.08, payee_id = 15, payer_id = 18, message = "Big 🐻", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 22.28, payee_id = 20, payer_id = 15, message = "Other stuff", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 23.68, payee_id = 4, payer_id = 10, message = "Stuff", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 78.76, payee_id = 10, payer_id = 11, message = "Fried chicken", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 87.33, payee_id = 8, payer_id = 6, message = "Pizzzaaa", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 96.71, payee_id = 8, payer_id = 11, message = "Thank you 🙏", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 57.06, payee_id = 3, payer_id = 13, message = "🍕", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 70.39, payee_id = 14, payer_id = 11, message = "Massage 💆 🙏🏽", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 49.59, payee_id = 1, payer_id = 13, message = "Dimes🥳", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 24.77, payee_id = 5, payer_id = 19, message = "lunch", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 22.49, payee_id = 3, payer_id = 13, message = "dum sum", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 12.35, payee_id = 1, payer_id = 14, message = "Bday weekend things 🎉", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 50.16, payee_id = 13, payer_id = 20, message = "BIRTHDAY LUNCH SPLIT", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 15.68, payee_id = 15, payer_id = 14, message = "Forgot the total 🤦‍♀️", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 91.54, payee_id = 11, payer_id = 8, message = "100 problems", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 54.38, payee_id = 4, payer_id = 20, message = "Hair apt", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 55.26, payee_id = 2, payer_id = 6, message = "Food", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 28.18, payee_id = 19, payer_id = 8, message = "Thank you!", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 53.11, payee_id = 17, payer_id = 14, message = "🏕", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 74.03, payee_id = 6, payer_id = 2, message = "Food", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 52.12, payee_id = 10, payer_id = 12, message = "Bobez", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 30.84, payee_id = 1, payer_id = 8, message = "New hair 😍", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 71.39, payee_id = 12, payer_id = 8, message = "⛳ 🍕", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 41.28, payee_id = 8, payer_id = 17, message = "IKEA", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 40.59, payee_id = 15, payer_id = 20, message = "Waba", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 35.54, payee_id = 9, payer_id = 4, message = "Tacos 🌮", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 8.44, payee_id = 12, payer_id = 3, message = "Boiling crab", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 94.87, payee_id = 15, payer_id = 10, message = "⛵", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 95.69, payee_id = 2, payer_id = 5, message = "Shipping", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 15.64, payee_id = 15, payer_id = 6, message = "🌯", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 18.88, payee_id = 16, payer_id = 18, message = "Gas", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 2.7, payee_id = 11, payer_id = 19, message = "Dinner", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 93.15, payee_id = 8, payer_id = 9, message = "💵", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 44.33, payee_id = 9, payer_id = 17, message = "Support your local small business ✨", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 34.14, payee_id = 7, payer_id = 10, message = "Poke plus the rest of the Vons bbq stuff", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 26.96, payee_id = 3, payer_id = 7, message = "Thank you!", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 34.05, payee_id = 10, payer_id = 1, message = "Groceries", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 71.99, payee_id = 15, payer_id = 12, message = "Me eating my food", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 28.3, payee_id = 8, payer_id = 5, message = "😘😘😘", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 54.79, payee_id = 11, payer_id = 10, message = "Misc", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 64.58, payee_id = 8, payer_id = 10, message = "🥙🍨", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 79.61, payee_id = 2, payer_id = 13, message = "Groceries, gas", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 69.78, payee_id = 12, payer_id = 13, message = "🍾", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 1.62, payee_id = 7, payer_id = 20, message = "Sofa", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 39.55, payee_id = 13, payer_id = 2, message = "TV", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 57.92, payee_id = 14, payer_id = 13, message = "🥧🍔", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 46.72, payee_id = 3, payer_id = 12, message = "🍣", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 38.51, payee_id = 1, payer_id = 5, message = "Yosemite🏕🧡🚗", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 88.13, payee_id = 20, payer_id = 5, message = "Jewelry ✨", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 63.55, payee_id = 15, payer_id = 20, message = "Comida 🤓", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 17.46, payee_id = 20, payer_id = 4, message = "Big 🐻", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 65.24, payee_id = 12, payer_id = 5, message = "Other stuff", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 18.21, payee_id = 6, payer_id = 14, message = "Stuff", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 8.47, payee_id = 8, payer_id = 20, message = "Fried chicken", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 79.33, payee_id = 8, payer_id = 7, message = "BIRTHDAY LUNCH SPLIT", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 73.7, payee_id = 2, payer_id = 18, message = "Forgot the total 🤦‍♀️", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 42.67, payee_id = 19, payer_id = 20, message = "100 problems", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 9.61, payee_id = 7, payer_id = 15, message = "Hair apt", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 99.82, payee_id = 17, payer_id = 6, message = "Food", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 55.54, payee_id = 1, payer_id = 20, message = "Thank you!", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 8.69, payee_id = 17, payer_id = 15, message = "BIRTHDAY LUNCH SPLIT", completed = True, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
    Transaction( privacy = 0, amount = 45.77, payee_id = 11, payer_id = 1, message = "Forgot the total 🤦‍♀️", completed = False, created_at = datetime.now() - timedelta(days = 369) + timedelta(days = random.random() * 365, hours = random.random() * 24, minutes = random.random() * 60)),
  ]

  random.shuffle(t_list)
  for t in t_list:
    t.privacy = random.choice([0,1,2])
    if t.completed:
      t.updated_at = t.created_at + timedelta(hours = random.random() * 24, minutes = random.random() * 60)
    elif not t.completed:
      t.updated_at = t.created_at
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
    if random.random() < 0.5:
      trans_post = Transaction.query.get(t + 1)
      c_list.append(Comment(message = random.choice(payer_comment_options), transaction_id = t + 1, user_id = trans_post.payer_id, created_at = trans_post.created_at + timedelta(minutes = random.random() * 10)))
      if random.random() < 0.5:
        c_list.append(Comment(message = random.choice(payee_comment_options), transaction_id = t + 1, user_id = trans_post.payee_id, created_at = trans_post.created_at + timedelta(minutes = 10 + random.random() * 10)))

  for c in c_list:
    db.session.add(c)
  db.session.commit()
