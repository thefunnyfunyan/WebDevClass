function handleRequest(req, res){
  res.writeHead(200, {
    "Content-Type":"text/html",
    "Set-Cookie":[
      "quote=cookies%20are%20for%20me",
      "sessionid=212;Expires=Wed, 09 Jun 2021 10:18:14 GMT",
      "session2=foo;Max-Age=120;httpOnly;"
    ]
  });
  res.write('<h1>shit</h1>');
  res.end(req.headers.cookie);
}

new require('http').Server(handleRequest).listen(8080);
