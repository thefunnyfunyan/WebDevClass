/**
 * Created by Brandon on 3/10/2016.
 */
var sqlite3 = require('sqlite3'),
    database = new sqlite3.Database('./db/wiki.sqlite3');

module.exports = exports = database;
