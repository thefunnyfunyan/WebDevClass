var routeMap = {
  get: [],
  post: [],
  put: [],
  patch: [],
  delete: []
};
//verb: [{regexp:[], keys:[], callback: function}]

function addRoute(route, verb, callback) {
  if(!route || !callback)
    return console.error("Undefined route or callback", route, callback);

  var tokens = route.split('/');
  var exp = [];
  var keys = [];
  for(var i = 0; i < tokens.length; i++){
    if(tokens[i].match(/:(\w+)/)) {
      exp.push("(\\w+)");
      keys.push(match[1]);
    }
    else {
      exp.push(tokens[i]);
    }
  }
  var regexp = new RegExp('^' + exp.join('/'), + '/?$');

  routeMap[verb.toLowerCase()].push({
    regexp: regexp,
    keys: keys,
    callback: callback
  });
}

function addResource(resource, controller){
  if(undefined == resource || undefined == controller)
    return console.error("Undefined resource or Controller", resource, controller);

  if(controller.new) addroute('/' + resource + '/new', 'get', controller.new);
  if(controller.create) addRoute('/' + resource, 'post', controller.create);
  if(controller.index) addRoute('/' + resource, 'get', controller.index);
  if(controller.show) addRoute('/' + resource + '/:id', 'get', controller.show);
  if(controller.edit) addroute('/' + resource + '/:id/edit', 'get', controller.edit);
  if(controller.update) addRoute('/' + resource + '/:id', 'put', controller.update);
  if(controller.destroy) addRoute('/' + resource + '/:id', 'delete', controller.destroy);
  if(controller.destroy) addRoute('/' + resource + '/:id/delete', 'get', controller.destroy);
}

function route(req, res) {
  var verb = req.method.toLowerCase();
  var path = req.url.split("?")[0];

  for(var i = 0; i < routeMap[verb].length; i++){
    if(routeMap[verb][i].regexp.exec(path)){
      var params = {};
      for(var j = 0; j < routeMap[verb][i].keys.length; j++){
        var key = routeMap[verb][i].keys[j];
        params[key] = match[j+1];
      }
      return routeMap[verb][i].callback.call(this, request, response, params);
    }
  }
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end("<h1>You came to the wrong neighborhood foo</h1>");
}

module.exports = exports = {
  addRoute: addRoute,
  addResource: addResource,
  route: route
};
