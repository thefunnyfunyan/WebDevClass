var view = require('../view/view'),
    db = require('../database/database'),
    formidable = require('formidable');


var post = {

  index: function(req, res) {
    var post = db.all('SELECT * FROM posts', function(err, post){
      if(err) {
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end('<h1>Server Error</h1>');
      }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(view.render('post/index', {post: post}));
    });
  },

  show: function(req, res, params) {
    var post = db.get('SELECT * from posts WHERE ID=?', params.id, function(err, post){
      if(err){
        console.error(err);
        res.writeHead(400, {'Content-Type':'text/html'});
        res.end('<h1>Resource Not Found</h1>');
      }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(view.render('post/show', post));
    })
  },

  new: function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(view.render('post/new'));
  },

  create: function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err){
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end('<h1>Server Error</h1>');
      }
      db.run('INSERT INTO posts (title, author, postContent) VALUES(?,?,?)',
        fields.title,
        fields.author,
        fields.postContent
      );
      post.show(req, res, )
    });
  },

  edit: function(req, res, params) {
    var post = db.get('SELECT * from posts WHERE ID=?', params.id, function(err,post){
      if(err){
        console.error(err);
        res.writeHead(400, {'Content-Type':'text/html'});
        res.end('<h1>Resource Not Found</h1>');
      }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(view.render('post/new', post));
    })
  },

  update: function(req, res, params){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err){
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end('<h1>Server Error</h1>');
      }
      db.run('UPDATE posts SET title = ?, author = ?, postContent = ? WHERE ID = ?',
        fields.title,
        fields.author,
        fields.postContent,
        params.id
      );
      post.show(req, res, params)
    })
  },

  destroy: function(req, res, params){
    db.run('DELETE FROM posts WHERE id = ?', params.id, function(err){
      if(err){
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end('<h1>Server Error</h1>');
      }
      res.writeHead(301, {"Content-Type":"text/html", "Location":"/post"});
      res.end("This page has moved to <a href='/equipment'>equipment</a>");
      //post.index(req, res);
    })
  }

}

module.exports = exports = post;
