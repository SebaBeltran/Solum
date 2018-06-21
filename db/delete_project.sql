delete from projects
where project_id = $1;
select * from projects;