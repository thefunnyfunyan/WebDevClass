var router = require('./router'),
    db = require('./db');
    view = require('./view');
    http = require('http');


// Populating the router with the equipment resource
//router.addRoute('/equipment', 'GET', equipment.index);
//router.addRoute('/equipment/new', 'GET', equipment.new);
//router.addRoute('/equipment', 'POST', equipment.create);
router.addResource('equipment', require('./controllers/equipment'));

// Launching the server
new http.Server(router.route).listen(8080);
