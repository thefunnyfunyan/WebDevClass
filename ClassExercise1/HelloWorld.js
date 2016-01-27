var http = require('http');
var fs = require('fs');

const PORT = 8080;

function handleRequest(request, response) {
  console.log(request.url);
  switch(request.url){
    case "/":
      console.log("html");
      testFunction("syllabus.html", response);
      break;
    case "/syllabus-a.css":
      console.log("css");
      testFunction("syllabus-a.css", response);
      break;
    default:
      response.end("404 not found");
      console.log("default hit");
  }
}

function testFunction(requestString, response){
  fs.readFile(requestString, function(err, data){
    if(err){
      console.log(err);
    }
    else {
      response.end(data);
    }
  })
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Started server on http://localhost:%s", PORT);
});
