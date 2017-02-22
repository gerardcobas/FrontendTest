(function() {
  describe("Repository", function() {
    var repository;
    var name;
    var stars;
    var fork;

    beforeEach(function() {
      name = "name";
      stars = 10;
      forks = 10;
      repository = new Repository(name, stars, forks);
    });

    it("has a name", function() {
      expect(repository.name).toBeDefined();
    });

    it("has the number of stars", function() {
      expect(repository.stars).toBeDefined();
    });

    it("has the number of forks", function() {
      expect(repository.forks).toBeDefined();
    });

    describe("instantiation", function() {
      it("saves the name", function() {
        expect(repository.name).toEqual(name);
      });

      it("saves the number of stars", function() {
        expect(repository.stars).toEqual(stars);
      });

      it("saves the number of forks", function() {
        expect(repository.forks).toEqual(forks);
      });
    });
  });

})();
