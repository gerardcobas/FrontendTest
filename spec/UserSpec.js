(function() {
  describe("User", function() {
    var user;
    var fullName;
    var username;
    var avatar;
    var repositories;

    beforeEach(function() {
      fullName = "fullName";
      username = "username";
      avatar = "avatar";
      repositories = "repositories";
      user = new User(fullName, username, avatar, repositories);
    });

    it("has a full name", function() {
      expect(user.fullName).toBeDefined();
    });

    it("has a username", function() {
      expect(user.username).toBeDefined();
    });

    it("has an avatar", function() {
      expect(user.avatar).toBeDefined()
    });

    it("has repositories", function() {
      expect(user.repositories).toBeDefined()
    });

    describe("instantiation", function() {
      it("saves the full name", function() {
        expect(user.fullName).toEqual(fullName);
      });

      it("saves the username", function() {
        expect(user.username).toEqual(username);
      });

      it("saves the avatar", function() {
        expect(user.avatar).toEqual(avatar);
      });

      it("saves the repositories", function() {
        expect(user.repositories).toEqual(repositories);
      });
    });
  });
})();
