//node --harmony index.js
//class Router {
//  constructor() {

//  }
//}

function router(){
  this.routeMap = [];

}

Router.prototype.addRouter = (path, callback){
  if(!path && !callback){
    console.error("undefind path or callback", path, callback);
    return;
  }

  var tokens = path.split('/');
  var exp = [];
  var keys = [];

  for(var i = 0; i< tokens.length; i++){
    var match = tokens[i].match(/:(w+)/);
    if(match){
      exp.push("(\\w+)");
      keys.push(match[1]);
    }else{
      exp.push(tokens[i]);
    }
  }

  var regExp = new RegExp('^' + exp.join('/') + '/?$')
  this.routeMap.push({regExp: regExp, keys: keys, callback: callback});
}

Router.prototype.route = function(req, res){
  var path = req.url.split("?")[0];
  for(var i = 0; i<this.routeMap.length; i++)
  {
    var match = this.routeMap[i].regExp.exec(path);
    if(match){
      var props = {};
      for(var j = 0; j< this.routeMap[i].keys.length; j++){
        props[key] = match[j + 1];
      }
      return this.routeMap[i].callback(req, res, props);
    }
  }
  res.writeHead(404, {'Content-type': 'text/html'});
  response.end("<h1>Resource Not Found</h1>");
}

module.exports = exports = new Router();
