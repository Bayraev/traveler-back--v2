const World = require('../models/World');
const User = require('../models/User');

class QuestService {
  async getRandomQuest(userId) {
    const world = await World.aggregate([
      { $sample: { size: 1 } },
      { $unwind: '$cities' },
      { $sample: { size: 1 } },
      { $unwind: '$cities.quests' },
      { $sample: { size: 1 } },
      {
        $project: {
          country: 1,
          'cities.city': 1,
          'cities.quests': 1,
          'cities.coordinates': {
            latitude: '$cities.latitude',
            longitude: '$cities.longitude',
            zoom: '$cities.zoom',
          },
        },
      },
    ]);

    if (!world.length) throw new Error('Квесты не найдены');

    const quest = {
      country: world[0].country,
      city: world[0].cities.city,
      coordinates: world[0].cities.coordinates,
      ...world[0].cities.quests,
    };

    const savedUser = await User.findByIdAndUpdate(userId, { currentQuest: quest });
    console.log(savedUser);
    return quest;
  }

  async completeQuest(userId, images) {
    const user = await User.findById(userId);
    if (!user.currentQuest) throw new Error('Нет активного квеста');

    const completedQuest = {
      ...user.currentQuest.toObject(),
      images,
    };

    await User.findByIdAndUpdate(userId, {
      $push: { completedQuests: completedQuest },
      $unset: { currentQuest: 1 },
    });

    return completedQuest;
  }

  /**
   * Gets current quest for specified user
   * @param {string} userId - User ID to get current quest for
   * @returns {Object} Current quest or null if none exists
   */
  async getCurrentQuest(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Пользователь не найден');

    return user.currentQuest || null;
  }

  /**
   * Gets all completed quests for specified user
   * @param {string} userId - User ID to get quests for
   * @returns {Array} Array of completed quests
   */
  async getAllQuests(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Пользователь не найден');

    return user.completedQuests || [];
  }
}

module.exports = new QuestService();
