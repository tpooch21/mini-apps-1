const Promise = require('bluebird');
const { parseAsync } = require('json2csv');

var flattenJSON = function(object) {

  var results = [];

  if (object.children.length === 0) {
    delete object.children;
    results.push(object);
    return results;
  }

  for (var i = 0; i < object.children.length; i++) {
    var innerResults = flattenJSON(object.children[i]);
    results = results.concat(innerResults);
  }

  delete object.children;

  results.unshift(object);

  return results;
};

// const json2csv = new Parser();

module.exports.getCSV = function(object, callback) {

  console.log('We have entered getCSV');
  const flattened = flattenJSON(object);
  console.log(flattened);

  const fields = [];
  for (var key in flattened[0]) {
    fields.push(key);
  }

  console.log('Logging fields => ', fields);

  const ops = {fields};

  return parseAsync(flattened, fields);

};



// var flattenJSONAsync = Promise.promisify(flattenJSON);

// module.exports = flattenJSONAsync;

