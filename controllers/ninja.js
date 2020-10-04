/**
 * This file will serve as a controller
 * between the model managing the data
 * and the main app.js
 */

const database = require("../models/database");
const randommer = require("./randommer");

function ninjaCat(str1, str2) {
  if (str1 !== "") str1 = str1.concat(" ");
  str1 = str1.concat(str2);
  return str1;
}

// Takes an array of buzzwords as input
// return the ninja name
async function ninjify(buzz, db) {
  var ninjaName = "";
  buzz.forEach((element) => {
    const result = database.checkBuzz(element, db);
    if (!result) {
      console.log("empty");
      var name = randommer.getSurname();
      var test = database.checkNinja(name, db);
      if (test !== undefined) {
        while (test !== undefined) {
          name = randommer.getSurname();
          test = database.checkNinja(name, db);
        }
      }
      database.save(element, name, db);
      ninjaName = ninjaCat(ninjaName, name);
    } else {
      console.log("not empty");
      console.log(result);
      ninjaName = ninjaCat(ninjaName, result.ninja);
    }
  });
  return ninjaName;
}

module.exports.ninjify = ninjify;
