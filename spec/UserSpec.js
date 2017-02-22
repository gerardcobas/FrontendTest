(function() {
  describe("User", function() {
    var user;

    beforeEach(function() {
      user = new User;
    })

    it("has a full name", function() {
      expect(user.fullName).toBeDefined()
    })

    it("has a username", function() {
      expect(user.username).toBeDefined()
    })

    it("has an avatar", function() {
      expect(user.avatar).toBeDefined()
    })

    it("has repositories", function() {
      expect(user.repositories).toBeDefined()
    })
  })
})();
