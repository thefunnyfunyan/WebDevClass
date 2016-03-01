var http = require('http'),
    router = require('./router');
    view = require('./view/view');

var post = require('./controllers/post');

router.addResource('post', post);

http.Server(router.route).listen(8080);
