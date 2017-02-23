(function() {
  describe("SearchView", function() {
    var seachView;
    var user;

    beforeEach(function() {
      user = "user";
      searchView = new SearchView(user);
    });

    it("stores a user property", function() {
      expect(searchView.user).toEqual(user)
    })

    
  });
})();
