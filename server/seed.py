#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Family

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("deleting tables...")
        Family.query.delete()
        print("Starting seed...")
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
        db.session.commit()

        family_list = Family.query.all()
        for f in family_list:
            print(f)
        # Seed code goes here!
