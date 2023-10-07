#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Family, User, Task, Like

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        # Family data
        print("deleting tables...")
        Family.query.delete()
        User.query.delete()
        Task.query.delete()
        Like.query.delete()
        print("Starting seed...")
        print("Seeding families...")
        families = []
        family_usernames = []
        test_family = Family(family_name="Smith", family_username="TheSmiths")
        test_family.password_hash = "Admin"
        family_usernames.append(test_family.family_username)
        families.append(test_family)
        for i in range (9):
            family_name = fake.last_name()
            family_username = fake.profile()['username']
            while family_username in family_usernames:
                family_username = fake.profile()['username']
            family_usernames.append(family_username)
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
            # make first user in family head of household
            new_users_family = User.query.filter_by(family_id=family.id).all()
            if len(new_users_family) ==0:
                new_user.head_of_household=True
                
            users.append(new_user)
            db.session.add(new_user)
        
        # Task data
        print("Seeding tasks...")
        tasks = []
        locations = ["Bedroom", "Bathroom", "Living Room", "Kitchen", "Yard", "Garage", "Man Cave", "She Shed"]
        frequencies = ["Daily", "Weekly", "Monthly"]
        for i in range (200):
            title = fake.sentence()
            location = rc(locations)
            description = fake.sentence()
            points = randint(1,100)
            frequency = rc(frequencies)
            family = rc(families)
            # randomly complete ~50% of tasks
            completed_by = None
            if fake.boolean():
                completed_by = rc([user for user in users if user.family_id ==family.id])

            new_task = Task(
                title=title,
                location=location,
                description=description,
                points=points,
                frequency=frequency
            )
            new_task.family = family    
            if completed_by:
                new_task.user = completed_by
            tasks.append(new_task)

        db.session.add_all(tasks)
        print('seeding likes...')
        for u in users:
            for i in range(int(len([user for user in users if u.family_id == user.family.id])/2)):
                user = rc([user for user in users if u.family_id ==user.family.id])
                while (user is u):
                    user = rc([user for user in users if u.family_id ==user.family.id])
                u.liked_by.append(user)
                db.session.add(u)

        db.session.commit()
        print('Seeding complete')



