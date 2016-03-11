var http = require('http'),
    router = require('./router'),
    view = require('./view/view'),
    fs = require('fs'),
    js = fs.readFileSync('./static/postPage.js');

var post = require('./controllers/post');
var comments = require('./controllers/comments');

router.addRoute('/postPage.js', 'GET', function(req, res){
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(js);
});

router.addResource('post', post);

router.addResource('post/:post_id/comments', comments);

new http.Server(router.route).listen(8080);
