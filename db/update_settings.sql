update settings set
user_name = $2,
profile_img = $3,
rate = $4
where user_id = $1;
select * from users
join settings on users.id = settings.user_id
where id = $1;