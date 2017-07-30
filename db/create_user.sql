INSERT INTO users (userId, username, currentteam, storypoint)
VALUES($1, $2, '{2,3,8,5,10}', 1)
RETURNING *