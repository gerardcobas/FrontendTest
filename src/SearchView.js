(function(exports) {

  function SearchView(user) {
  }

  SearchView.prototype.returnHTMLSuccess = function(user) {
    var userTag = `<ul class=\"list img-list\"><li><div class=\"li-img\"><img src=\"${user.avatar}\"></div><div class=\"li-text\"><p class=\"li-sub\">@${user.username}</p><h1 class=\"li-head\">${user.fullName}</h1></div></li></ul>`;
    var repoTag = "<table><thead><tr><td class=\"repo-offset\" colspan=\"2\"></td></tr></thead><tbody>"
    user.repositories.forEach(function(element) {
      repoTag+= `<tr><td class=\"repo-offset\" colsplan=\"1\">${element.name} </td><td> Stars: ${element.stars}</td><td> Forks: ${element.forks}</td></tr>`
    })
    return userTag+= repoTag + "</tbody></table>"
  }

  SearchView.prototype.returnHTMLFail = function() {
    return "<p>Does not exist</p>"
  }

  exports.SearchView = SearchView;

})(this);
