const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');
const createError = require('http-errors');

/**
 * Updates user's profile picture
 * @param {string} userId - User ID
 * @param {string} imagePath - Path to new image
 * @returns {Promise<Object>} Updated user object
 * @throws {Error} If user not found
 */
const updateProfilePicture = async (userId, imagePath) => {
  const user = await User.findById(userId);
  if (!user) throw createError(404, 'Пользователь не найден');

  // Delete old avatar if it exists and isn't the default
  if (user.avatar) {
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

  if (!updatedUser) throw createError(404, 'Пользователь не найден');

  return updatedUser;
};

module.exports = {
  updateProfilePicture,
};
