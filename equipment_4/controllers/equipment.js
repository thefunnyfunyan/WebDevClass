var view = require('../view'),
    db = require('../db'),
    formidable = require('formidable');

// A controller for the equipment resource
// This should have methods for all the RESTful actions
var equipment = {
  index: function(req, res) {
    var equipment = db.all('SELECT * FROM equipment', function(err, equipment){
      if(err) {
        console.error(err);
        res.writeHead(500, {"Content-Type":"text/html"});
        res.end("<h1>Server Error</h1>");
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(view.render('equipment/index', {equipment: equipment}));
    });
  },

  show: function(req, res, params) {
    var equipment = db.get('SELECT * FROM equipment WHERE ID=?', params.id, function(err, equipment){
      if(err) {
        console.error(err);
        res.writeHead(400, {"Content-Type":"text/html"});
        res.end("<h1>Resource Not Found</h1>");
        return;
      }
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(view.render('equipment/show', equipment));
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
  },

  redirect: function(req, res) {
    res.writeHead(301, {"Content-Type":"text/html", "Location":"/equipment"});
    res.end("This page has moved to <a href='/equipment'>equipment</a>");
  },

  autocomplete: function(req, res, params) {
    db.all('SELECT DISTINCT name FROM equipment WHERE name LIKE ?', params.token + '%', function(err, data){
      if(err) {
        console.error(err);
        res.writeHead(400, {"Content-Type":"text/json"});
        res.end("[]");
        return;
      }
      res.writeHead(200, {"Content-Type":"text/json"});
      res.end(JSON.stringify( data.map( function(pair) {return pair.name}) ));
    });
  }
}

module.exports = exports = equipment;
