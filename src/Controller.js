(function(exports) {
  function Controller() {
    this.searchView = new SearchView;
    this.apiClient = new APIClient(this);
  }

  Controller.prototype.updateHTML = function(user) {
    var element = document.getElementById('app');
    element.innerHTML = this.searchView.returnHTMLSuccess(user);
  }

  Controller.prototype.displayError = function() {
    var element = document.getElementById('app');
    element.innerHTML = this.searchView.returnHTMLFail();
  }

  Controller.prototype.findUser = function(username) {
    this.apiClient.searchUser(username);
  }

  exports.Controller = Controller;
})(this);
