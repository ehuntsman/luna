UPDATE users
SET currentteam = $1
where id = $2
RETURNING *