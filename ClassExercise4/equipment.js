var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('equipment.sqlite3');

db.serialize(function() {
  db.run("CREATE TABLE equipment (id INTEGER PRIMARY KEY, name VARCHAR(50), serial VARCHAR(10), property_num VARCHAR(25))");

  for(var i = 0; i < 20 ; i++){
      db.run("INSERT INTO equipment (name, property_num) VALUES  ('WIIMote', 'CIS-WII"+ i +"')");
  }

  db.each("SELECT * FROM equipment", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  })
})
