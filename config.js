// Should normally be in the gitignore, or in sample that you should change for yourself
// Here visible to simplify your test
const header = {
  "x-api-key": "2d4cefc346864a33b176f69b25805890",
};

const dbUrl = "mongodb://localhost:27017";
const dbName = "ninjify";

module.exports.header = header;
module.exports.dbUrl = dbUrl;
module.exports.dbName = dbName;
