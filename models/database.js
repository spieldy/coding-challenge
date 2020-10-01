const config = require("../config");
const mongo = require("mongodb").MongoClient;

mongo.connect(
  config.dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);

    // Storing a reference to the database so you can use it later
    database = client.db(config.dbName);
    console.log(`Connected MongoDB: ${config.dbUrl}`);
    console.log(`Database: ${config.dbName}`);
  }
);

var database = [];

function checkBuzz(word) {
  const result = database.find((d) => d.buzz === word);
  console.log(result);
  return result;
}

function checkNinja(name) {
  const result = database.find((d) => d.ninja === name);
  return result;
}

function save(word, name) {
  const entry = {
    buzz: word,
    ninja: name,
  };
  this.database.push(entry);
}

module.exports.database = database;
module.exports.checkBuzz = checkBuzz;
module.exports.checkNinja = checkNinja;
module.exports.save = save;
