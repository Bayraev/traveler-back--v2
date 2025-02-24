const User = require('../models/User');
const Quest = require('../models/Quest');
const createError = require('http-errors');
const userService = require('../services/user.service');
const { DTO, userDTO } = require('../DTOs/DTOs');
const { ApiResponse, ApiError } = require('../DTOs/DTOs');

const completeQuest = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { questId, photoUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      throw createError(404, 'User not found');
    }

    const quest = await Quest.findById(questId);
    if (!quest) {
      throw createError(404, 'Quest not found');
    }

    const alreadyCompleted = user.completedQuests.some((q) => q.questId.toString() === questId);
    if (alreadyCompleted) {
      throw createError(400, 'Quest already completed');
    }

    user.completedQuests.push({ questId, photoUrl });
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates user's profile picture
 */
const updateProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(ApiError('Image is required', 400, 'Изображение обязательно'));
    }

    const updatedUser = await userService.updateProfilePicture(req.params.userId, req.file);
    const formattedUser = userDTO(updatedUser);

    res.status(200).json(ApiResponse(formattedUser, 200, 'Аватар успешно обновлен'));
  } catch (error) {
    if (error.message === 'Пользователь не найден') {
      return res.status(404).json(ApiError('User not found', 404, 'Пользователь не найден'));
    }
    next(error);
  }
};

module.exports = {
  completeQuest,
  updateProfilePicture,
};
