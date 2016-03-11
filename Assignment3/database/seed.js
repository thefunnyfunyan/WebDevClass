var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('./database/blog.sqlite3');

db.serialize(function(){

  db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title VARCHAR(50), author VARCHAR(250), postContent TEXT )");

  db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY, postId INTEGER, author VARCHAR(50), commentContent TEXT, FOREIGN KEY(postId) REFERENCES posts(id))");

  db.run("INSERT INTO posts (title, author, postContent) VALUES ('First Ever Post', 'Brandon Runyan', 'This is my first ever blog post, please go easy on me and do not post a whole bunch of mean comments about how terrible of a blog writer i am.... cuz... ya know... thats mean....')");

  db.run("Insert INTO comments (postId, author, commentContent) VALUES (1, 'SomeRandomGuy', 'Dude you are just so terrible at writing stuff so you should stop')");

  db.run("Insert INTO comments (postId, author, commentContent) VALUES (1, 'NicePerson', 'Hey, that was mean, dont say such rude things.')");

  db.run("Insert INTO comments (postId, author, commentContent) VALUES (1, 'Brandon Runyan', 'Aww, thats nice.... and f*** you random person! I created you!!! YOU WILL OBEY ME!!!!!!')");

  db.each("SELECT * FROM posts", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });

  db.each("SELECT * FROM comments", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  })
})
