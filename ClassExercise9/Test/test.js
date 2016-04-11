"use strict"

var assert = require("assert");

describe('reality check', function(){
  it('2 + 2 should be 4', function(){
    assert.equal(2+2, 4);
  })

  it('1 + 1 should be 3', function(){
    assert.notEqual(1+1, 3)
  })
});
