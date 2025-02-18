const User = require('../models/User');
const Quest = require('../models/Quest');
const createError = require('http-errors');
const userService = require('../services/user.service');
const { DTO } = require('../DTOs/DTOs');

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
      return next(createError(400, 'Изображение обязательно'));
    }
    const updatedUser = await userService.updateProfilePicture(req.params.userId, req.file.path);
    res.json(DTO(updatedUser, null));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  completeQuest,
  updateProfilePicture,
};
