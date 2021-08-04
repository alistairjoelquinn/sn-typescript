DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK (first != ''),
    last VARCHAR(255) NOT NULL CHECK (last != ''),
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL CHECK (password != ''),
    image VARCHAR(300),
    bio TEXT,
    date TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE password_reset_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR,
    email VARCHAR,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);