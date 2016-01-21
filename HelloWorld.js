var http = require('http');
var fs = require('fs');

const PORT = 8080;

function handleRequest(request, response) {
  console.log(request.url)
  var data = fs.readFileSync(request.url);
  response.write(fs.readFileSync("syllabus.html"));
  response.write(fs.readFileSync("syllabus-a.css"));
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Started server on http://localhost:%s", PORT);
});
