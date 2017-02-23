(function(exports) {
  function Controller() {
    this.searchView = new SearchView;
    this.apiClient = new APIClient;
  }

  Controller.prototype.updateHTML = function() {
    element = document.getElementById('app')
    element.innerHTML = this.searchView.returnHTMLSuccess();
  }


  exports.Controller = Controller;
})(this);
