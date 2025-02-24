const User = require('../models/User');
const imageService = require('./image.service');

class AuthService {
  /**
   * Creates new user with optional avatar
   * @param {Object} userData - User registration data
   * @param {File} avatarFile - Uploaded avatar file
   * @returns {Promise<Object>} Created user object
   */
  async signup(userData, avatarFile) {
    const { username, password } = userData;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    let avatarUrl = '';
    if (avatarFile) {
      avatarUrl = await imageService.uploadSingleImage(avatarFile);
    }

    const user = new User({
      username,
      password,
      avatar: avatarUrl,
    });

    await user.save();
    return user;
  }

  /**
   * Authenticates user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<Object>} User object
   */
  async signin(username, password) {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}

module.exports = new AuthService();
