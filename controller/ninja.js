/**
 * This file will serve as a controller 
 * between the model managing the data 
 * and the main app.js
 */

 const database = require('../model/database');

function ninjaCat(str1, str2) {
   if (str1 !== "") str1 = str1.concat(" ");
   str1 = str1.concat(str2);
   return str1;
}

 // Takes an array of buzzwords as input
 // return the ninja name
 function ninjify(buzz) {
   var ninjaName = "";
   buzz.forEach(element => {
      const result = database.check(element)
      if (!result) {
         //console.log('not found');
      } else {
         ninjaName = ninjaCat(ninjaName, result.ninja);
      };
   });
   return ninjaName;
 }

 module.exports.ninjify = ninjify;