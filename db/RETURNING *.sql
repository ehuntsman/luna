INSERT INTO users (userId, username)
VALUES($1, $2)
RETURNING *