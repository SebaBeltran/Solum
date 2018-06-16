delete from clients
where client_id = $1;
select * from clients;