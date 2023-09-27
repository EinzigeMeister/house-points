#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Family, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        # Family data
        print("deleting tables...")
        Family.query.delete()
        User.query.delete()
        print("Starting seed...")
        print("Seeding families...")
        families = []
        family_usernames = []
        for i in range (10):
            family_name = fake.last_name()
            family_username = fake.profile()['username']
            while family_username in family_usernames:
                family_username = fake.profile()['username']
            password_hash = fake.password(length=10)
            
            new_family = Family(family_name=family_name, family_username=family_username)
            new_family.password_hash = password_hash

            families.append(new_family)

        db.session.add_all(families)

        # User data
        print("Seeding users...")
        users = []
        for i in range(100):
            name = fake.first_name()
            family = rc(families)
            new_user = User(
                name=name
            )
            new_user.family= family
            new_users_family = User.query.filter_by(family_id=family.id).all()
            # make first user in family head of household
            if len(new_users_family) ==0:
                new_user.head_of_household=True
                
            users.append(new_user)
            db.session.add(new_user)
        
        db.session.commit()
        print('Seeding complete')



