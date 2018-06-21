select * from clients
join projects on projects.client_id = clients.client_id

where projects.user_id = $1