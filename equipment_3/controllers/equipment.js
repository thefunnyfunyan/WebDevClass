var view = require('../view'),
    db = require('../db');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
var equipment = {
  index: function(req, res) {
console.log(view);
    var equipment = db.all('SELECT * FROM equipment', function(err, equipment){
      if(err) {
        res.writeHead(500, {"Content-Type":"text/html"});
        res.end("<h1>Server Error</h1>");
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(view.render('equipment/index', {equipment: equipment}));
    });
  },

  new: function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(view.render('equipment/new'));
  },

  create: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      db.run('INSERT INTO equipment (name, model_number, serial_number, property_number, description) values (?,?,?,?,?)',
        fields.name,
        fields.model_number,
        fields.serial_number,
        fields.property_number,
        fields.description
      );
      equipment.index(req, res)
    });
  },

  destroy: function(req, res, params) {
    console.log(params.id);
    db.run('DELETE FROM equipment WHERE id=?', params.id);
    equipment.index(req, res);
  }
}

module.exports = exports = equipment;
