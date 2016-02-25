var http = require('http'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync("config.json", {"encoding": "utf-8"})),
    indexjs = require('/test');


const PORT = 8080;

function handleRequest(request, response) {
  console.log(request.url);
  switch (request.url) {
    case "/":
    case "/index":
    case "/index.html":
      indexjs.writePage(fs);
      break;
    default:
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end('page not found');
  }
}


var server= http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("started server on port: " + PORT);
});
