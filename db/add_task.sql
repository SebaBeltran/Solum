insert into tasks (project_id, task, due_date, color_tag, user_id, tracked_time, status)
values ($1, $2, $3, $4, $5, $6, $7);
select * from tasks
where project_id = $1;