var express = require('express')
    app = express();
    db = require('./Database/db');

function logRequest(req, res, next){
  console.log("requested: " ,req.url, new Date())
  next();
}

app.use(logRequest);

app.get('/greet/:name', function(req, res){
  res.send('hello world'+ req.params.name);
})

app.listen(8080, function(){
  console.log('listening on port 8080...')
});
