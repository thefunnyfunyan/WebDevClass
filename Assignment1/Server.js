var http = require('http');
var fs = require('fs');

const PORT = 8080;

function handleRequest(request, response) {
  console.log(request.url);
  switch(request.url){
    case "/":
      testFunction("Default.html", response);
      break;
    case "/index":
      testFunction("Default.html", response);
      break;
    case "/index.html":
      testFunction("Default.html", response);
      break;
    case "/Style.css":
      testFunction("Style.css", response);
      break;
    case "/Images/dilbertComic.gif":
      testFunction("Images/dilbertComic.gif", response);
      break;
    case "/Images/IMG_3736.JPG":
      testFunction("Images/IMG_3736.JPG", response);
      break;
    default:
      response.statusCode = 404;
      response.end("404 not found");
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
