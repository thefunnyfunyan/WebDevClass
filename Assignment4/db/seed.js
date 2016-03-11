/**
 * Created by Brandon on 3/10/2016.
 */
var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('./db/wiki.sqlite3');

db.serialize(function(){

    db.run("CREATE TABLE user (id INTEGER PRIMARY KEY, name VARCHAR(50), password VARCHAR(50), admin BOOLEAN, banned BOOLEAN)");

    db.run("CREATE TABLE content (id INTEGER PRIMARY KEY, content TEXT, chat TEXT, title VARCHAR(50))");


    for(var i = 0; i < 10; i++){
        db.run("INSERT INTO user (name, password, admin, banned) VALUES ('user"+i+"', 'password', 0, 0)")
    }

    db.run("INSERT INTO content (content, chat, title) VALUES ('really small wiki. should deffinantly be upgraded', 'This is the chat page for the first ever wiki. Soooo Exciting', 'first ever wiki')")

    db.run("UPDATE user Set  admin= 1 WHERE id = 1");

    db.each("SELECT * FROM user", function(err, row){
        if(err) return console.error(err);
        console.log(row);
    });

    db.each("SELECT * FROM content", function(err, row){
        if(err) return console.error(err);
        console.log(row);
    })
})
