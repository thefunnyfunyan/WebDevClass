var http = require('http');

const PORT = 8080;

function handleRequest(request, response) {
  response.end("it works!");
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
console.log("Started server on http://localhost:%s", PORT);
});
