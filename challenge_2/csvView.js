// Template csv file, send back form as well
const _ = require('underscore');
const Promise = require('bluebird');

module.exports.compiled = _.template(
  `<div class="csv-generator">
    <form action="http://localhost:3000" method="post" >
      <label for="sales">Data: </label><br>
      <input type="text" name="json" placeholder="submit JSON data here"><br>
      <input type="submit" value="Submit">
    </form>
    <p class="csv-results">
      <%= csv %>
    </p>
  </div>`
);

