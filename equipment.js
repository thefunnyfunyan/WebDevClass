var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('equipment.sqlite3');

db.serialize(function() {
  db.run("CREATE TABLE equipment (id INTEGER PRIMARY KEY, name TEXT, serial TEXT, image_url TEXT)");

  for(var i = 0; i < 10; i++) {
    db.run("INSERT INTO equipment (name, serial) values ('WiiMote',?)", i);
  }
  
  db.each("SELECT id, name, serial FROM equipment", function(err, row) {
      if(err) return console.error(err);
      console.log(row);
  });
});
