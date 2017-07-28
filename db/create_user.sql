INSERT INTO users (userId, username, currentteam)
VALUES($1, $2, '{2,3,8,5,10}')
RETURNING *