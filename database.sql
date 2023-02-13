DROP DATABASE IF EXISTS usersdb;

CREATE DATABASE usersdb;

USE usersdb;

CREATE TABLE  people(
  id int not null auto_increment,
  name VARCHAR(50) not null,
  email VARCHAR(50),
  address VARCHAR(50) not null,
  PRIMARY KEY (id)
);

insert into people(name, email, address) value("Adela Magallanes","adela@gmail.com","Avenida Ayacucho 443");