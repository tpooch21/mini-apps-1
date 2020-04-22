const express = require('express');
const app = express();
const port = 4568;

const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

app.listen(port, () => {console.log(`Server is listening on port ${port}`)});

app.use(parser.json());
app.use(parser.urlencoded());

app.use(express.static(__dirname + 'public'));

// Establish connection with database using mysql.createConnection



// Set up routes to appropriate functions
app.post('/users', (req, res) => {});

app.post('/addresses', (req, res) => {});

app.post('/cards', (req, res) => {});


// Define model functions for interactions with DB



// Set up DBs in separate file






