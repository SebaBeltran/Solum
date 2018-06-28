select *, (select sum(tracked_time) as tracked_time from tasks where projects.project_id = tasks.project_id) from projects 
where user_id = $1;