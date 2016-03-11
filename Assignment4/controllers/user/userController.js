/**
 * Created by Brandon on 3/10/2016.
 */

var db = require('../../db/database'),
    view = require('../../view/view');

var user = {
    index: function(req, res){
        var users = db.all('SELECT * FROM user', function(err, users){
            if(err){
                console.error(err);
                res.writeHead(500, {'Content-Type':'text/html'});
                res.end('<h1>Server Error</h1>');
            }
            res.writeHead(200, {'Content-Tyoe':'text/html'});
            res.end(view.render('user/user', {users: users}))
        })
    },

    edit: function(req, res, params){
        var val
        var col
        if(params.edit == "unban"){
            val = 0;
            col = "banned";
        }else if(params.edit == "ban"){
            val = 1;
            col = "banned";
        }else if(params.edit == "promote"){
            val = 1;
            col = "admin";
        }else {
            val = 0;
            col = "admin"
        }
        db.run("UPDATE user Set "+col+" = " + val + " WHERE id = "+params.id);
    }
}

module.exports = exports = user;