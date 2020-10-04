var database = [];
const collectionName = "ninja";

async function checkBuzz(word, db) {
  const collection = db.collection(collectionName);
  //const result = database.find((d) => d.buzz === word);
  const result = await collection.find({ buzz: word }).toArray();
  if (result.length === 0) return false;
  return true;
}

async function checkNinja(name, db) {
  const result = database.find((d) => d.ninja === name);
  return result;
}

async function save(word, name, db) {
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
