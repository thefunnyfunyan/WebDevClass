var express = require('express'),
    app = express(),
    user = require('./controllers/user/userController'),
    wikiPages = require('./controllers/wikiPages/wikiPagesController'),
    http = require('http').Server(app),
    passport = require('passport');

app.use(function(req, res, next){
  var auth = req.headers.authorization;
  if(auth){
    var b = new Buffer(auth.split(' ')[1],'base64'),
        s = b.toString(),
        creds = s.split(':'),
        username = creds[0],
        pass = creds[1];
    console.log(username + ' ' + pass);
    next()
  }else{
    res.writeHead(401, {'WWW-Authenticate':'Basic'});
    res.end();
  }
})

app.use(express.static('public'));

app.get('/', function(req, res){
    wikiPages.index(req, res)
});

app.get('/user', function(req, res){
    user.index(req, res)
});

app.get("/page/new", function(req, res){
    wikiPages.new(req, res);
});

app.get("/page/:id/edit", function(req, res){
    wikiPages.edit(req, res, req.params)
})

app.get('/page/:id', function(req, res){
    wikiPages.show(req, res, req.params)
});

app.post("/user/:edit/:id", function(req, res){
    user.edit(req, res, req.params);
    res.redirect('/user');
});

app.post('/page/:id/edit', function(req, res){
    wikiPages.update(req, res, req.params);
    res.redirect('/page/' + req.params.id);
})

app.post('/page/new', function(req, res){
  wikiPages.create(req, res);
  res.redirect('/');
})

app.post("/page", function(req, res){
    wikiPages.create(req, res);
    res.redirect('/');
});

app.post("/page/:id/addChat", function(req, res){
    wikiPages.addChat(req, res, req.params)
});


app.all('*', function(req, res) {
    res.end("BAAAAD");
})

http.listen(8080, function(){
    console.log("listening on port 8080...");
});
