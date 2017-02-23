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

      it("returns html with user and repository information", function() {
        expect(searchView.returnHTMLSuccess(user)).toEqual("<img src=\"avatar_url\"><h3>username</h3><br><h1>fullname</h1><br>Repositories<br><h3>Repository</h3>")
      })

    })

  });
})();
