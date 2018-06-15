update clients set 
first_name = $2,
last_name = $3,
pos = $4,
company = $5,
email = $6,
phone = $7,
client_pic = $8
where client_id = $1;
select * from clients;