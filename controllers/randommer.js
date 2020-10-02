/**
 * This file serve as controller to generate a new ninja name
 * It will request on the randommer api
 */

const fetch = require("node-fetch");
const querrystring = require("querystring");
const config = require("../config");

const host = "http://randommer.io/api/";

// Headers in separate file: config.js
const headers = config.header;

// Array of all the surnames available
var surnames = [];

// Define prototype to concat without duplicates
Array.prototype.unique = function () {
  var array = this.concat();
  for (var i = 0; i < array.length; ++i) {
    for (var j = i + 1; j < array.length; ++j) {
      if (array[i] === array[j]) array.splice(j--, 1);
    }
  }

  return array;
};

// Fill surnames[] with a request to randommer API
function initSurnames() {
  var test = true;
  const param = {
    nameType: "surname",
    quantity: "200",
  };

  // Path defined here because the api offer other possibility
  const path = "Name";

  const url = host + path + "?" + querrystring.stringify(param);

  const result = fetch(url, { method: "GET", headers: headers })
    .then((res) => {
      if (res.status === 200) return res.json();
      test = false;
      return false;
    })
    .then((json) => {
      if (json) {
        surnames = surnames.concat(json).unique();
      }
      test = false;
      return false;
    });

  return test;
}

function getSurname() {
  // 100 is an arbitrary value
  if (surnames.length === 0 || surnames.length < 100) {
    const result = initSurnames();
    if (!result) return false;
  }
  return surnames.pop();
}

module.exports.initSurnames = initSurnames;
module.exports.getSurname = getSurname;
