// Build express app
// Response from server should contain the CSV report along with the form so the user can keep submitting indefinitely
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const formidable = require('formidable');

const flatJSON = require('./createCSV');

const port = 3000;

const compiler = require('./csvView');

app.use(morgan('tiny'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname + '/client')));

// Direct post requests from form submission to CSV compiler and send results back to client

// fs.readFile
// path.join

const readFileAsync = Promise.promisify(fs.readFile);

app.post('/', (req, res) => {

  return flatJSON.getCSV(JSON.parse(req.body.json))
  .then((csv) => {
    var csvHTML = compiler.compiled({ csv });
    res.send(csvHTML);
  })
  .catch((err) => {
    console.log('Logging err from template => ', err);
    res.sendStatus(404);
  });

});


app.post('/upload', (req, res) => {
  var form = formidable();
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.sendStatus(404);
    }
    res.write('File uploaded!');
    res.end();
  })


});






