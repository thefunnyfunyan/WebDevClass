var fs = require('fs'),
    marked = require('marked');

// Load and parse the configuration file
var config = JSON.parse(fs.readFileSync('config.json', {encoding: "utf-8"}));

// Cached static files
var css = fs.readFileSync('gallery.css', {encoding: "utf-8"}),
    js = fs.readFileSync('bundle.js', {encoding: "utf-8"});

function handleRequest(req, res) {

  // Get the resource portion of the path - everything before the query string
  var path = req.url.split('?')[0];

  // Determine if it was a GET or POST request we recieved
  switch(req.method.toUpperCase()) {
    case 'GET':
      switch(path) {
        case '/':
        case '/index':
        case '/index.htm':
        case '/index.html':
          // Serve the list of galleries
          return serveIndex(req, res);
        case '/gallery.css':
          // Serve the css file directly
          res.writeHead(200, {"Content-Type":"text/css"});
          res.end(css);
          return;
        case '/bundle.js':
          // Serve the js file directly
          res.writeHead(200, {"Content-Type":"text/css"});
          res.end(js);
          return;
        default:
          // determine if we are looking at an image or directory
          // start by stripping the leading '/' from the path
          path = path.substr(1);
          // image paths *should* contain a second forward slash
          // between the directory and image, i.e. gallery/image.jpeg
          if(path.includes('/')) return serveImage(req, res, path);
          else return serveGallery(req, res, path);
      }
    case 'POST':
        // All form submissions we'll pass on to a helper function;
        return handleForm(req, res);
    default:
      // We don't handle other kinds of requests
      res.writeHead(400, {"Content-Type":"text/html"});
      res.end("<h1>Bad Request</h1>");
      return;
  }
}

// This helper function serves the main list of galleries -
// the index page.  It includes the form for creating new
// galleries.
function serveIndex(req, res) {
  // Create the <li> tags containing an <a> tag for each gallery
  var galleryLinks = config.galleries.map(function(gallery){
    return  "<li>" +
            "<a href='/" + gallery.path + "'>" + gallery.name + "</a> " +
            "<span class='desc'>" + gallery.description + "</span>" +
            "</li>";
  }).join('\n');
  res.writeHead(200, {"Content-Type":"text/html"});
  res.end(
    "<!doctype html>" +
    "<html>" +
    "  <head>" +
    "    <title>Galleries</title>" +
    "    <link rel='stylesheet' href='gallery.css' type='text/html' />" +
    "  </head>" +
    "  <body>" +
    "    <h1>Galleries</h1>" +
    "    <ul class='gallery-list'>" +
    galleryLinks +
    "    </ul>" +
    "    <form action='/' method='POST'>" +
    "      <label for='name'>Gallery Name:" +
    "        <input type='text' name='name'>" +
    "      </label>" +
    "      <label for='name'>Description (You can use Markdown):" +
    "        <textarea id='preview-src' name='description'></textarea>" +
    "      </label>" +
    "      <label>Description Preview:" +
    "        <div id='preview-pane'></div>" +
    "      </label>" +
    "      <button id='preview-btn'>Preview Description</button>" +
    "      <input type='submit' value='Create Gallery' />" +
    "    </form>" +
    "    <script src='bundle.js'></script>" +
    "  </body>" +
    "</html>"
  );
}

// This helper function serves a specific gallery, corresponding
// to the path argument (which is the resource path).  It also
// includes the form for uploading images to this specific gallery
function serveGallery(req, res, path) {
  // Find the requested gallery by iterating through all galleries
  // until we find the appropriate one.  A more succinct (and clearer)
  // approach would be to use Array.prototype.find, which you can see
  // in action in the uploadImge() function below.
  for(var i = 0; i < config.galleries.length; i++) {
    if(config.galleries[i].path == path) {
      var imageTags = config.galleries[i].images.map(function(image){
        return "<div>" +
               "  <img src='/" + image.path + "' alt='" + image.name + "'/>" +
               "  <p>" + image.caption + "</p>" +
               "</div>";
      }).join("\n");
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(
        "<!doctype html>" +
        "<html>" +
        "  <head>" +
        "    <title>" + config.galleries[i].name + "</title>" +
        "    <link rel='stylesheet' href='gallery.css' type='text/html' />" +
        "  </head>" +
        "  <body>" +
        "    <h1>" + config.galleries[i].name + "</h1>" +
        "    <a href='/'>Back to Gallery List</a>" +
        "    <div class='image-list'>" +
        imageTags +
        "    </div>" +
        "    <form method='POST' enctype='multipart/form-data' action='/" + config.galleries[i].path + "'>" +
        // We use a hidden input to pass on the gallery path
        "       <input type='hidden' name='path' value='" + config.galleries[i].path + "' />" +
        "       <label for='image'>Picture File:" +
        "         <input type='file' name='image' />" +
        "       </label>" +
        "       <label for='caption'>Caption (you can use Markdown):" +
        "         <textarea id='preview-src' name='caption'></textarea>" +
        "       </label>" +
        "       <label>Caption Preview:" +
        "         <div id='preview-pane'></div>" +
        "       </label>" +
        "       <button id='preview-btn'>Preview Caption</button>" +
        "       <input type='submit' value='Upload Picture to Gallery' />" +
        "    </form>" +
        "    <script src='bundle.js'></script>" +
        "  </body>" +
        "</html>"
      );
      // Exit the function, terminating the loop early - we're done
      return;
    }
  }
  // If we get past the for loop, there is not a gallery with that name
  res.writeHead(404, {"Content-Type":"text/html"});
  res.end("<h1>Resource Not Found</h1>");
}

// This helper function serves an image file,
// corresponding to the path parameter
function serveImage(req, res, path) {
  fs.readFile(path, function(err, file){
    if(err) {
      console.error(err);
      res.writeHead(404, {"Content-Type":"text/html"});
      res.end("<h1>Resource Not Found</h1>");
      return;
    }
    // We use the type "image/*" - a more *correct* approach would
    // be to access the type stored in the configuration object
    // and use that instead
    res.writeHead(200, {"Content-Type":"image/*"});
    res.end(file);
  });
}

// This function handles form submissions - both for
// creating new galleries and uploading images
function handleForm(req, res) {
  var form = new require('formidable').IncomingForm();
  form.parse(req, function(err, fields, files) {
    if(err) {
      console.error(err);
      res.writeHead(500, {"Content-Type":"text/html"});
      res.end("<h1>Server Error</h1>");
      return;
    }
    // Was this an image upload or a gallery?  Images have
    // a path input, so see if that field is defined
    if(fields.path) uploadImage(req, res, fields, files);
    else createGallery(req, res, fields);
  });
}

// Helper method for creating a new gallery
function createGallery(req, res, fields) {
  // Create a path from the gallery name by replacing
  // whitespace and other non-path characters with
  // underscores and downcasing all characters
  var path = fields.name.replace(/['\.,\\/\s]+/g, '_').toLowerCase();
  // Make a directory corresponding to our new path
  fs.mkdir(path, function(err){
    if(err) {
      console.error(err);
      res.writeHead(500, {"Content-Type":"text/html"});
      res.end("<h1>Unable to create gallery</h1>");
      return;
    }
    // Add the empty gallery to our site configuration
    config.galleries.push({
      name: fields.name,
      path: path,
      // use marked to transform markdown in the description to html
      description: marked(fields.description),
      images: []
    });
    saveConfig();
    // Serve the gallery list (index) page
    // with the new gallery listed
    serveIndex(req, res);
  });
}

// Helper method for processing uploaded images
function uploadImage(req, res, fields, files) {
  // Create a file path by downcasing and replacing whitespace in
  // the filename with underscores and appending to the gallery path
  var path = fields.path + '/' + files.image.name.replace(/\s+/, '_').toLowerCase();
  // Copy temporary upload file into the gallery
  fs.createReadStream(files.image.path).pipe(fs.createWriteStream(path));
  // Add the image to our config
  // Find the gallery in the config object
  var gallery = config.galleries.find(function(gallery) {return gallery.path == fields.path});
  // Push the image to the gallery's images array
  gallery.images.push({
    name: files.image.name,
    path: path,
    type: files.image.type,
    // Use marked to transform markdown in the caption into html
    caption: marked(fields.caption)
  });
  saveConfig();
  // Serve the gallery page
  // with the new image added
  serveGallery(req, res, fields.path);
}

// A helper function that serailizes the current
// configuration and saves it to the disc as JSON
function saveConfig() {
  fs.writeFile('config.json', JSON.stringify(config), function(err){
    if(err) console.error(err);
  });
}

new require('http').Server(handleRequest).listen(8080);
