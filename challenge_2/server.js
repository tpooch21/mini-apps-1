// Build express app
// Response from server should contain the CSV report along with the form so the user can keep submitting indefinitely
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;

app.use(morgan('tiny'));
// app.use(path('/'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log()
  res.send('Hello World!')
});






