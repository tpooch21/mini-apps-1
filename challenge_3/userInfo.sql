CREATE DATABASE IF NOT EXISTS shoppingcart;

USE shoppingcart

CREATE TABLE IF NOT EXISTS users (
  id INT(11) AUTO_INCREMENT,
  fullname VARCHAR(200),
  email VARCHAR(200),
  pwd VARCHAR(200),
  line1 VARCHAR(200),
  line2 VARCHAR(200),
  city VARCHAR(200),
  addstate VARCHAR(20),
  zip INT(11),
  cardnum INT(20),
  expiry DATE,
  cvv INT(11),
  billingzip INT(11),
  PRIMARY KEY (id)
);



