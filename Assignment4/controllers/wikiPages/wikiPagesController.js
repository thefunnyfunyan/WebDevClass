/**
 * Created by Brandon on 3/10/2016.
 */

var db = require('../../db/database'),
    view = require('../../view/view'),
    formidable = require('formidable');

var wikiPages ={

    index: function(req, res){
        var pages = db.all('SELECT * FROM content', function(err, pages){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            res.writeHead(200, {'Content-Tyoe':'text/html'});
            res.end(view.render('wikiPages/index', {pages: pages}))
        })
    },

    show: function(req, res, params){
        var page = db.get("SELECT * FROM content WHERE id=" + params.id, function(err, page){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(view.render('wikiPages/wikiEntry', page))
        })
    },

    new: function(req, res){
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(view.render('wikiPages/newWiki'));
    },

    create: function(req, res){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            db.run("INSERT INTO content (content, title, chat) VALUES (? , ?, '')", fields.content, fields.title)
        })
    },

    edit: function(req, res, params){
        var page = db.get("SELECT * FROM content WHERE id=" + params.id, function(err, page){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(view.render('wikiPages/newWiki', page))
        })
    },

    update: function(req, res, params){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            db.run("UPDATE content SET content=?, title=? WHERE id=?", fields.content, fields.title, params.id);
        })
    },

    addChat: function(req, res, param){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            db.run("UPDATE content SET chat=? WHERE id=?", fields.content, param.id);
        })
        res.redirect('/page/' + param.id)
    }

}


module.exports = exports = wikiPages;