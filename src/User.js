(function(exports) {
  function User(fullName, username, avatar) {
    this.fullName = fullName;
    this.username = username;
    this.avatar = avatar;
    this.repositories = [];
  }

  User.prototype.createRepository = function(name, stars, forks) {
    var repository = new Repository(name, stars, forks);
    this.repositories.push(repository);
  }

  exports.User = User;
})(this);
