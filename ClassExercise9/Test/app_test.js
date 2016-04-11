var app = require('../app'), //../app.js would work too
    port = 8080,
    server,
    http = require('http'),
    assert = require('assert');

before(function(done){
  server = app.listen(function(err, result){
    if(err) done(err);
    else done()
  })
})

after(function(){
  server.close();
});

describe('app tests', function(){
  it('app should exist', function(){
    assert.ok(app);
  });
  it('should be listening at port ' + port, function(done){
    http.get('http://localhost:' + port, function(res){
      assert.equal(res.statusCode, 404);
      done();
    });
  });
})
