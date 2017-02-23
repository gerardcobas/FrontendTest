(function(exports) {

  function SearchView(user) {
  }

  SearchView.prototype.returnHTMLSuccess = function(user) {
    var userTag = `<h1>${user.fullName}</h1><br><h3>${user.username}</h3><br><img src=\"${user.avatar}\"><br><h1>Repositories</h1>`;
    var repoTag = "<ul>"
    user.repositories.forEach(function(element) {
      repoTag+= `<li>${element.name} ${element.forks}<span>  ${element.stars}</li>`
    })
    return userTag+= repoTag + "</ul>"
  }

  SearchView.prototype.returnHTMLFail = function() {
    return "<p>Does not exist</p>"
  }

  exports.SearchView = SearchView;

})(this);
