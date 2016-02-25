

function writePage(fs, response){
  response.writeHead(200, {'Content-Type' : 'text/html'});
  fs.readFile('index.html', function(err, data){
    if(err){
      console.log("There was an error:");
      console.log(err);
      return;
    }
    response.end(data);
  })
}

exports.writePage = writePage;
