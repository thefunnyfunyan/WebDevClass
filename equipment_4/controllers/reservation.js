"use strict"

var view = require('../view');

class ReservationController {

  new(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(view.render('reservation/new'));
  }

}

module.exports = exports = new ReservationController();
