-- First create the user table
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Then create the pet table
CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Finally create the junction table with foreign keys
CREATE TABLE user_pet (
    id SERIAL PRIMARY KEY,
    user INTEGER REFERENCES user(id),
    pet INTEGER REFERENCES pet(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user, pet)
); 