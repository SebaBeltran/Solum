update tasks set
task = $2,
due_date = $3,
color_tag = $4,
tracked_time = $5,
status = $6,
project_id = $7,
completed_date = $8
where task_id = $1;
select * from tasks;