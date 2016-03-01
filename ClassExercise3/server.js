"use strict";

var querystring = require('querystring'),
    http = require('http'),
    fs = require('fs'),
    config,
    cssData;


      // The use of a syncronous file read makes sense
      // here, as it happens as the server is booting,
      // and we don't want to start serving until its
      // data has been cached
      cssData = fs.readFileSync("gallery.css", {"encoding":"utf-8"});
      config = JSON.parse(fs.readFileSync("ConfigFile.JSON", {"encoding": "utf-8"}));
function saveConfig(config){
  fs.writeFile("config.json", JSON.stringify(config), function(err){
    if(err) console.error("unable to save config file", err);
  })
}

function serveImage(req, res) {
  var filename = "./" + req.url;
  fs.stat(filename, function(err, stats) {
    if(err) {
      console.error("Error 1 in serveImage", err);
      res.writeHead(404, {'content-type': 'text/html'});
      res.end('Resource Not Found');
      return;
    }
    if(stats.isFile()){
      fs.readFile(filename, function(err, file) {
        if(err) {
          console.error("Error 2 in serveImage", err);
          res.writeHead(404, {'content-type': 'text/html'});
          res.end('Resource Not Found');
          return;
        }
        res.writeHead(200, {'content-type': 'text/' + filename.split('.').last });
        res.end(file);
      });
      return;
    }
  });
}

function serveGallery(req, res, info) {
  // Load our images
  if(info && info.title) saveConfig(info.title);
  fs.readdir('images', function(err, files) {
    if(err) {
      console.error("Error in serveGallery", err);
      res.writeHead(500, {'content-type': 'text/html'});
      res.end('Server Error');
      return;
    }

    // Create a list of image tags from the directory contents
    var imageTags = files.filter( function(file){
      // Filter files for images
      return fs.statSync('images/' + file).isFile();
    }).map( function(file) {
      // Wrap file with img tag
      return "<img src='/images/" + file + "'/>";
    }).join("\n");

    // Show a gallery page
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<!doctype html>\n' +
      '<html>\n' +
      '  <head>\n' +
      '    <title>'+ config.title +'</title>\n' +
      '    <link href="gallery.css" type="text/css" rel="stylesheet"/>' +
      '  </head>\n' +
      '  <body>\n' +
      '    <h1>'+config.title+'</h1>\n' +
      '      <div class="gallery">' +
      imageTags +
      '      </div>' +
      createForm() +
      '  </body>\n' +
      '</html>\n'
    );
  });
}

function parseFormData(req, res, query, callback){
  if(req.method != "POST") return callback(req, req, query);
  var body = '';
  req.on('data', function(data){
    body + data;
  });
  req.on('end', function(){
    var data =  querystring.parse(body);
    callback(req, res, data);
  })
}

function createForm() {
  return "<form action='/'>" +
    "<input type='text' name='title'/>" +
    "<input type='submit' value='save changes' />" +
    "</form>";
}

function serveCSS(req, res) {
  res.writeHead(200, {'content-type':'text/css'});
  res.end(cssData);
}

var server = new http.Server( function(req, res) {
  var resource = req.url.split("?")[0];
  var info = querystring.parse(req.url.split("?")[1]);

  switch(resource) {
    case "/":
      parseFormData(req, res, info, serveGallery);
      break;
    case "/favicon.ico":
      res.writeHead(400);
      res.end();
      break;
    case "/gallery.css":
      serveCSS(req, res);
      break;
    default:
      serveImage(req, res);
      break;
  }
}).listen(80);
