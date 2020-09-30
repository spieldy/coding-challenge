var database = [
    { buzz: 'php', ninja: 'shadow'},
    { buzz: 'sass', ninja: 'sakai'}
];

function check(word) {
    const result = database.find(d => d.buzz === word);
    return result;
}


module.exports.database = database;
module.exports.check = check;