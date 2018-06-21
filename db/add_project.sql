insert into projects (user_id, client_id, project_name, estimated_hours, tracked_hours, start_date, end_date, color_tag, rate)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9);
select * from projects