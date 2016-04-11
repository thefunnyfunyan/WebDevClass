var app = require('../app.js'),
    port = 8090,
    server,
    http = require('http'),
    assert = require('assert')
    fs = require('fs');


before(function(done) {
  server = app.listen(port, function(err, result) {
    if(err) done(err);
    else done();
  });
});

after(function(){
  server.close();
});

describe('app tests', function() {

  it('app should exist', function() {
    assert.ok(app);
  });

  it('should be listening at port ' + port, function(done){
    http.get('http://localhost:' + port, function(res) {
      assert.equal(res.statusCode, 404);
      done();
    });
  });

  function(testStaticFile(url, path){
    it('should serve' +url+' from '+path+'', function(done){
      var fileBody = fs.readFileSync(path);
      http.get('http://localhost:' + port, function(res) {
        assert.equal(res.statusCode, 200);
        var body = '';
        res.on('data', function(data){
          body += data
        })
        res.on('end', function(){
          assert.equal(fileBody, body)
        })
        done();
        res.on('err', function(err){done(err)})
      });

    })

  }
  


});
