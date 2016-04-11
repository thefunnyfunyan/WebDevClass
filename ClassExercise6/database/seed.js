'use strict'

var db = require('./db');
db.serialize(function(){
  db.run('drop table if exists users');
  db.run('create table users(id integer primary key, username text, crypted_password text, admin boolean)');
  db.run('insert into users (username, crypted_password, admin) values ( "user", "pass", 1)');
  db.all('select * from users', (err, user) => console.log(user));

});
