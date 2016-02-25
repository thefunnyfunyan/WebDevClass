var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('equipment.sqlite3');

// Create the database schema and populate
db.serialize(function() {
  // Create the equipment table
  db.run("CREATE TABLE equipment (id INTEGER PRIMARY KEY, name VARCHAR(50), model_number VARCHAR(25), serial_number VARCHAR(25), property_number VARCHAR(25), description TEXT )");
  // Populate the equipment table
  for(var i = 0; i < 20; i++) {
    db.run("INSERT INTO equipment (name, property_number) VALUES ('WiiMote', 'CIS-WII-" + i + "')");
  }
  // Log contents of equipment table to the console
  db.each("SELECT * FROM equipment", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });
});
