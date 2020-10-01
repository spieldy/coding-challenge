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

async function requestSurname() {
  const param = {
    nameType: "surname",
    quantity: "1",
  };
  const path = "Name";

  const url = host + path + "?" + querrystring.stringify(param);

  const result = await fetch(url, { method: "GET", headers: headers })
    .then((res) => {
      if (res.status === 200) return res.json();
      return false;
    })
    .then((json) => {
      if (json) return json[0];
      return false;
    });

  const data = result;
  // The data is what we want here
  console.log("randommer result");
  console.log(data);
  return data;
}

module.exports.requestSurname = requestSurname;
