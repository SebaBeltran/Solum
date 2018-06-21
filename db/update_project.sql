update projects set
user_id = $2,
client_id = $3,
project_name = $4,
estimated_hours = $5,
start_date = $6,
end_date = $7,
color_tag = $8,
rate = $9
where project_id = $1;
select * from projects;