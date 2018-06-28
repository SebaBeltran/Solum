select count(status), completed_date from tasks
GROUP by completed_date
where user_id = $1