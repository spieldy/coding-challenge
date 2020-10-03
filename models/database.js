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
