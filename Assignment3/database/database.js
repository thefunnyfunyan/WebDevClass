var sqlite3 = require('sqlite3'),
    database = new sqlite3.Database('./database/blog.sqlite3');

module.exports = exports = database;
