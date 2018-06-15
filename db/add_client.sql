insert into clients (first_name, last_name, pos, company, email, phone, user_id, client_pic)
values ($1, $2, $3, $4, $5, $6, $7, $8);
select * from clients
where user_id = $7;