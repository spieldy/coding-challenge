/**
 * This file will serve as a controller
 * between the model managing the data
 * and the main app.js
 */

const database = require("../model/database");
const randommer = require("./randommer");

function ninjaCat(str1, str2) {
  if (str1 !== "") str1 = str1.concat(" ");
  str1 = str1.concat(str2);
  return str1;
}

// Takes an array of buzzwords as input
// return the ninja name
// If error, empty string is returned
function ninjify(buzz) {
  var ninjaName = "";
  buzz.forEach((element) => {
    const result = database.check(element);
    if (!result) {
      // Cannot await for randommer.requestSurname() because it said it's not an async function
      const data = randommer.requestSurname();
      // Here result is Promise { Pending }
      console.log("ninja result");
      console.log(data);
    } else {
      ninjaName = ninjaCat(ninjaName, result.ninja);
    }
  });
  return ninjaName;
}

module.exports.ninjify = ninjify;
