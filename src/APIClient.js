(function(exports) {
  function APIClient(controller) {
    self = this;
    this.controller = controller;
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
      self.getRepositories(data.login, user);
      } else {
        self.controller.displayError();
      }
    };
    request.onerror = function() {
      console.log("There was a connection error");
    };
    request.send();
  }

  APIClient.prototype.getRepositories = function(username, user) {
    var requestURL = `https://api.github.com/users/${username}/repos`
    var request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        for(count=0;count < data.length; count++) {
          var repository = data[count]
          user.createRepository(repository.name, repository.forks_count, repository.stargazers_count)
        }
    	self.controller.updateHTML(user);
      } else {
        console.log("Not Found");
      }
    };
    request.onerror = function() {
      console.log("There was a connection error");
    };
    request.send();
  }

exports.APIClient = APIClient;

})(this);
