select * from users
join settings on users.id = settings.user_id
where auth_id = $1;