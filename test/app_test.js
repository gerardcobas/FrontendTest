const assert = require('chai').assert;
const connection = require('../app.js').connection;

describe('App', function() {

  it('connection should work for existing profile', function() {
    let url = 'https://api.github.com/users/pedromrsoares'
    let result = connection(url);
    assert.equal(result, 'connected');
  });

});
