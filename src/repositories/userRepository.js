const User = require("../models/user");

class UserRepository {
  findByUsername(username) {
    return User.findOne({ username });
  }

  findByEmailOrUsername(email, username) {
    return User.findOne({
      $or: [{ email }, { username }],
    });
  }

  create(userData) {
    return User.create(userData);
  }
}

module.exports = new UserRepository();
