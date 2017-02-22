(function(exports) {
  function User(fullName, username, avatar, repositories) {
    this.fullName = fullName;
    this.username = username;
    this.avatar = avatar;
    this.repositories = repositories;
  }
  exports.User = User;
})(this);
