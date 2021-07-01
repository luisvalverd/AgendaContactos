CREATE DATABASE agendaContactos;

CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username varchar(50) UNIQUE NOT NULL,
	email varchar(255) UNIQUE NOT NULL,
	password varchar(50) NOT NULL
);

CREATE TABLE contactos (
	contactos_id serial PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	telefono varchar(10),
	user_id Integer NOT NULL REFERENCES users (user_id)
);

INSERT INTO users (username, email, password) VALUES 
	('john', 'john@gmail.com', 'john123'),
	('luis', 'luis@gmail.com', 'luis123');

INSERT INTO contactos(nombre, apellido, telefono, user_id) VALUES 
	('javier', 'chavez', '0967408301', 1),
	('jerac', 'mera', '0932442314', 1),
	('andres', 'valverde', '0934343421', 2);