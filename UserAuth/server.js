function handleRequest(req, res){
  var auth = req.headers.authorization;
  if(auth){
    var b = new Buffer(auth.split(' ')[1], 'base64'),
        s = b.toString(),
        credentials = s.split(':'),
        username = credentials[0],
        password = credentials[1];

        console.log(username, password);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('<h1>Welcom '+username + '</h1>');
        return;

  }
  res.writeHead(401, {"WWW-Authenticate": "Basic"});
  res.end();
}

new require('http').Server(handleRequest).listen(8080);
