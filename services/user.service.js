const User = require('../models/User');
const imageService = require('./image.service');
const createError = require('http-errors');

class UserService {
  /**
   * Updates user's profile picture
   * @param {string} userId - User ID
   * @param {File} avatarFile - New avatar file
   * @returns {Promise<Object>} Updated user object
   */
  async updateProfilePicture(userId, avatarFile) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Пользователь не найден');

    // Upload new avatar to ImgBB
    const avatarUrl = await imageService.uploadSingleImage(avatarFile);

    // Update user with new avatar URL
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });

    if (!updatedUser) throw new Error('Пользователь не найден');
    return updatedUser;
  }
}

module.exports = new UserService();
