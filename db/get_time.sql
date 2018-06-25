select sum(tracked_time) from tasks
where user_id = $1