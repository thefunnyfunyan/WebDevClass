var view = require('../view/view'),
    db = require('../database/database'),
    formidable = require('formidable');

var comments ={
  index: function(req, res, params, __callback){
    var comments = db.all('SELECT * FROM comments where postId = ?', params.id, function(err, comments){
      if(err){
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end("<h1>Server Error</h1>");
      }
      __callback(comments);
    });
  },

  new: function(req, res){
    res.end('<p><label for="author">Author: </label><input name="author" type="text" /></p><p><label for="comment">Comment: </label><input name="comment" type="text" /></p>');
  },

  create: function(req, res, data){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err){
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html'});
        res.end('<h1>Server Error</h1>');
      }
      db.run('INSERT INTO comment (postId, author, commentContent) VALUES(?,?,?)',
        data.post_id,
        fields.author,
        fields.postContent
      );
      res.end('<div class="Comment"><div class="Comment__Author"><h4>?</h4></div><div class="Comment__Content">?</div></div>', fields.author, fields.content);
    });
  }
}

module.exports = exports = comments;
