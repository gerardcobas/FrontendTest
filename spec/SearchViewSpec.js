(function() {
  describe("SearchView", function() {
    var seachView;
    var user;

    beforeEach(function() {
      user = "user";
      searchView = new SearchView(user);
    });

    it("displays error message when username does not exist", function() {
      expect(searchView.returnHTMLFail()).toEqual("<p>Does not exist</p>");
    });

    describe("User with one repository", function() {
      beforeEach(function() {
        var repository = {
          name: "repository",
          stars: 1,
          forks: 1
        }
        user = {
          fullName: "fullname",
          username: "username",
          avatar: "avatar_url",
          repositories: [repository]
        }
      });

      xit("returns html with user and repository information", function() {
        expect(searchView.returnHTMLSuccess(user)).toEqual("<ul class=\"list img-list\"><li><div class=\"li-img\"><img src=\"avatar_url\"></div><div class=\"li-text\"><p class=\"li-sub\">@username</p><h1 class=\"li-head\">fullname</h1></div></li></ul><table><thead><tr><td colspan=\"2\"><h2>Repositories</h2></td></tr></thead><tbody><tr><td class=\"repo-offset\" colsplan=\"1\">repository </td><td>   <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"16\" viewBox=\"0 0 14 16\"><path fill-rule=\"evenodd\" d=\"M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z\"/></svg>   1   <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"16\"viewBox=\"0 0 10 16\"><path fill-rule=\"evenodd\" d=\"M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"/></svg> 1 </td></tr></tbody></table>");
      });

    });

  });
})();
