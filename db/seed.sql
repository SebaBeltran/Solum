--USERS TABLE
create table users (
id SERIAL PRIMARY KEY,
user_name VARCHAR(180), 
profile_pic TEXT, 
auth_id VARCHAR(180)
);

--SETTINGS TABLE
create table settings (
user_id INTEGER REFERENCES users(id),
theme VARCHAR(20),
hour_rate INTEGER
);

--CLIENTS TABLE
create table clients (
client_id SERIAL PRIMARY KEY,
first_name VARCHAR(80),
last_name VARCHAR(80),
pos VARCHAR(80),
company VARCHAR(80),
email VARCHAR(80),
phone VARCHAR(15),
user_id INTEGER REFERENCES users(id),
);

--ADD IMAGE COLUMN TO CLIENTS
alter table clients
add column client_pic text;

--PROJECTS TABLE
create table projects (
project_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
client_id INTEGER REFERENCES clients(client_id),
project_name VARCHAR(80),
estimated_hours INTEGER,
tracked_hours INTEGER,
start_date DATE,
end_date DATE,
color_tag VARCHAR(10)
);

--NOTES TABLE
create table notes (
note_id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES projects(project_id),
auth_id INTEGER REFERENCES users(id),
content TEXT
);


--CREATE FAKE DATA
insert into clients (first_name, last_name, pos, company, email, phone, user_id)
values ('Carl', 'Sauls', 'developer', 'Google', 'carlsauls@gmail.com', '32457893', 10);

update clients set client_pic = 'https://rideamigos.com/wp-content/uploads/2016/09/google_square.png'
where client_id = 1;

insert into clients (first_name, last_name, pos, company, email, phone, user_id)
values ('Ward', 'Massey', 'CEO', 'Fake Company', 'wardmassey@gmail.com', '0954359', 10);

update clients set client_pic = 'https://images.unsplash.com/photo-1506171704646-9299e07efb04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c4b32ff83521e06ac2c9ddfe91589419&auto=format&fit=crop&w=800&q=60'
where client_id = 2;

insert into clients (first_name, last_name, pos, company, email, phone, user_id)
values ('Vance', 'Riggins', 'CTO', 'Another Fake Company', 'vanceriggins@gmail.com', '30954359', 10);

update clients set client_pic = 'https://images.unsplash.com/photo-1509399693673-755307bfc4e1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=65e1b39f8c4efb9a7a0f2714b6302092&auto=format&fit=crop&w=1100&q=80'
where client_id = 3;


--UPDATE USER
update clients set 
first_name = $2,
last_name = $3,
pos = $4,
company = $5,
email = $6,
phone = $7,
client_pic = $8,
where client_id = $1;


--PROJECTS
insert into projects (user_id, client_id, project_name, estimated_hours, tracked_hours, start_date, end_date, color_tag)
values (10, 20, 'My First Project', 20, 13, '02 Jul 2018', '09 Jul 2018', '#44C4E9');

insert into projects (user_id, client_id, project_name, estimated_hours, tracked_hours, start_date, end_date, color_tag)
values (10, 20, 'My Second Project', 4, 6, '22 Jun 2018', '23 Jul 2018', '#E99344');