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
    ]);

    if (!world.length) throw new Error('Квесты не найдены');

    const quest = {
      country: world[0].country,
      city: world[0].cities.city,
      ...world[0].cities.quests,
    };

    await User.findByIdAndUpdate(userId, { currentQuest: quest });
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
}

module.exports = new QuestService();
