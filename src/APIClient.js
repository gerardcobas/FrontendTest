(function(exports) {
  function APIClient() {
    self = this;
  }

  APIClient.prototype.searchUser = function(username) {
    var requestURL = `https://api.github.com/users/${username}`
    var request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
    	console.log(data)
      var user = new User(data.name, data.login, data.avatar_url)
      self.getRepositories(data.login);
      } else {
        console.log("error")
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
      console.log("uh oh")
    };
    request.send();
  }

  APIClient.prototype.getRepositories = function(username) {
    var requestURL = `https://api.github.com/users/${username}/repos`
    var request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
    	console.log(data)
      } else {
        console.log("error")
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
      console.log("uh oh")
    };
    request.send();
  }

exports.APIClient = APIClient;

})(this);
