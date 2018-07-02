select *  from users
join settings on users.id = settings.user_id
where 