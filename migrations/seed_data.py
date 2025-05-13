from faker import Faker
import mysql.connector
import random
import os

fake = Faker()

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    database="",
    user="",
    password=""
)

cursor = conn.cursor()

# Populate users
for _ in range(2000):
    cursor.execute(
        "INSERT INTO `user` (firstName, lastName) VALUES (%s, %s);",
        (fake.first_name(), fake.last_name())
    )

# Populate pets
for _ in range(40000):
    cursor.execute(
        "INSERT INTO pet (name) VALUES (%s);",
        (fake.first_name() + "'s pet",)
    )

conn.commit()

# Get all user and pet IDs
cursor.execute("SELECT id FROM `user`;")
user_ids = [row[0] for row in cursor.fetchall()]
cursor.execute("SELECT id FROM pet;")
pet_ids = [row[0] for row in cursor.fetchall()]

# Create unique user-pet pairs
used_pairs = set()

for _ in range(5000):
    while True:
        u = random.choice(user_ids)
        p = random.choice(pet_ids)
        if (u, p) not in used_pairs:
            used_pairs.add((u, p))
            break
    cursor.execute(
        "INSERT INTO userpet (user, pet) VALUES (%s, %s);",
        (u, p)
    )

conn.commit()
cursor.close()
conn.close()

print("Done")