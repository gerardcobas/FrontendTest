(function(exports) {

  function SearchView(user) {
  }

  SearchView.prototype.returnHTMLSuccess = function(user) {
    var userTag = `<ul class=\"list img-list\"><li><div class=\"li-img\"><img src=\"${user.avatar}\"></div><div class=\"li-text\"><p class=\"li-sub\">@${user.username}</p><h1 class=\"li-head\">${user.fullName}</h1></div></li></ul>`;
    var repoTag = "<table><thead><tr><td colspan=\"2\"><h2>Repositories</h2></td></tr></thead><tbody>"
    user.repositories.forEach(function(element) {
      repoTag+= `<tr><td class=\"repo-offset\" colsplan=\"1\">${element.name} </td><td>   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/></svg>
 ${element.stars}   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>
 ${element.forks}</td></tr>`
    })
    return userTag+= repoTag + "</tbody></table>"
  }

  SearchView.prototype.returnHTMLFail = function() {
    return "<p>Does not exist</p>"
  }

  exports.SearchView = SearchView;

})(this);
