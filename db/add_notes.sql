insert into notes (project_id, user_id, title, content)
values ($1, $2, $3, $4);
select * from notes
where user_id = $2;