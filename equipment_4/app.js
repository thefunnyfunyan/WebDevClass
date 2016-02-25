var http = require('http'),
    router = require('./router'),
    db = require('./db'),
    view = require('./view'),
    fs = require('fs'),
    js = fs.readFileSync('./static/bundle.js');

// Add a route to the client-side JavaScript bundle
router.addRoute('/bundle.js', 'GET', function(req, res) {
  res.writeHead(200, {"Content-Type":"text/html"});
  res.end(js);
});

// Populating the router with the equipment resource
var equipment = require('./controllers/equipment');
// Add a route to redirect '/' to '/equipment'
router.addRoute('/', 'GET', equipment.redirect);
// Add the equipment resource
router.addResource('equipment', equipment);
// Add the autocomplete route
router.addRoute('/equipment/autocomplete/:token', 'GET', equipment.autocomplete);

// Add the reservation resource
router.addResource('reservation', require('./controllers/reservation'));

// Launching the server
new http.Server(router.route).listen(8080);
