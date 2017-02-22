(function(exports) {
  function Repository(name, stars, forks) {
    this.name = name;
    this.stars = stars;
    this.forks = forks;
  }
  exports.Repository = Repository;
})(this);
