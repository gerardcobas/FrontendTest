(function(exports) {

  function SearchView(user) {
  }

  SearchView.prototype.returnHTMLSuccess = function(user) {
    var userTag = `<ul class=\"list img-list\"><li><div class=\"li-img\"><img src=\"${user.avatar}\"></div><div class=\"li-text\"><p class=\"li-sub\">@${user.username}</p><h2 class=\"li-head\">${user.fullName}</h2></div></li></ul><br><h1>Repositories</h1>`;
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
