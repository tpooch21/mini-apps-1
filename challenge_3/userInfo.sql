CREATE DATABASE shoppingcart;

USE shoppingcart

CREATE TABLE users (
  id INT(11) AUTO_INCREMENT,
  fullname VARCHAR(200),
  email VARCHAR(200),
  pass VARCHAR(200),
  PRIMARY KEY (id)
);

CREATE TABLE addresses (
  id INT(11) AUTO_INCREMENT,
  line1 VARCHAR(250),
  line2 VARCHAR(250),
  addstate VARCHAR(20),
  addcity VARCHAR(20),
  zip INT(11),
  userID INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY (userID) users(id)
);

CREATE TABLE cards (
  id INT(11) AUTO_INCREMENT,
  cardnum INT(40),
  expiry DATE,
  cvv INT(11),
  billingzip INT(11),
  userID INT(11),
  PRIMARY KEY (id),
  FOREIGN KEY (userID) users(id)
);



