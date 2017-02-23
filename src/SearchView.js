(function(exports) {

  function SearchView(user) {
    this.user = user;
  }

  SearchView.prototype.returnHTMLSuccess = function() {
    return ""
  }

  SearchView.prototype.returnHTMLFail = function() {
    return "<p>Does not exist</p>"
  }

  exports.SearchView = SearchView;

})(this);
