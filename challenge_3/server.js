const express = require('express');
const app = express();
const port = 4568;

const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');

app.listen(port, () => {console.log(`Server is listening on port ${port}`)});

app.use(parser.json());
app.use(parser.urlencoded());
app.use(cors());
app.use(express.static('public'));

// Establish connection with database using mysql.createConnection

const db = mysql.createConnection({
  host: 'localhost',
  user: 'trevor',
  password: 'flamingo',
  database: 'shoppingcart'
});

db.connect();

// Define model functions for interactions with DB
const postUsers = (userInfo, callback) => {
  let queryString = 'INSERT INTO users VALUES(0, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)';
  let queryArgs = [userInfo.name, userInfo.email, userInfo.password];

  db.query(queryString, queryArgs, (err, results) => {
    if (err) {
      console.log('Logging error from insert => ', err);
      callback(err);
    }
    console.log('Query inserted successfully, gave back these results => ', results);
    callback(results);
  });

};




// Set up routes to appropriate functions
app.post('/users', (req, res) => {
  var userInput = JSON.parse(req.body.json);
  console.log('Logging userInput obj => ', userInput);
  postUsers(userInput, (err, results) => {
    if (err) {
      res.sendStatus(404);
    }
    res.send(results);
  });

});

app.post('/addresses', (req, res) => {});

app.post('/cards', (req, res) => {});




// Set up DBs in separate file






