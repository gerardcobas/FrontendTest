(function() {
  describe("User", function() {
    var user;
    var fullName;
    var username;
    var avatar;
    var repositoryName;
    var repositoryStars;
    var repositoryForks;

    beforeEach(function() {
      fullName = "fullName";
      username = "username";
      avatar = "avatar";
      repositories = "repositories";
      user = new User(fullName, username, avatar);
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

    it("has an array of repositories", function() {
      expect(user.repositories.constructor.name).toEqual("Array");
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
    });

    describe("can make a new repository", function() {
      beforeEach(function() {
        repositoryName = "name";
        repositoryStars = 1;
        repositoryForks = 1;
        user.createRepository(repositoryName, repositoryStars, repositoryForks)
      })

      it("pushes to the repositories array", function() {
        expect(user.repositories.length).toEqual(1);
      });

      it("stores the correct details from the method", function() {
        var createdRepository = user.repositories[0];
        expect(createdRepository.name).toEqual(repositoryName);
        expect(createdRepository.forks).toEqual(repositoryForks);
        expect(createdRepository.stars).toEqual(repositoryStars);
      });
    });
  });
})();
