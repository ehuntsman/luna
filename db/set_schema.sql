DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userId text,
    username TEXT
);

INSERT INTO users (userId, username)
VALUES('test', 'test');