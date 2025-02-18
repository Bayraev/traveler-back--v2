const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');

/**
 * Updates user's profile picture
 * @param {string} userId - User ID
 * @param {string} imagePath - Path to new image
 * @returns {Object} Updated user object
 */
const updateProfilePicture = async (userId, imagePath) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Пользователь не найден');

  // Delete old avatar if it exists and isn't the default
  if (user.avatar && user.avatar !== '/default-avatar.png') {
    try {
      await fs.unlink(path.join('uploads', path.basename(user.avatar)));
    } catch (error) {
      console.error('Ошибка при удалении старого аватара:', error);
    }
  }

  // Update user with new avatar
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: '/' + imagePath },
    { new: true },
  );

  return updatedUser;
};

module.exports = {
  updateProfilePicture,
};
