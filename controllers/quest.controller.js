const Quest = require('../models/Quest');
const createError = require('http-errors');

const getRandomQuest = async (req, res, next) => {
  try {
    const quest = await Quest.aggregate([
      { $sample: { size: 1 } },
      {
        $lookup: {
          from: 'locations',
          localField: 'locationId',
          foreignField: '_id',
          as: 'location',
        },
      },
      { $unwind: '$location' },
    ]);

    if (!quest.length) {
      throw createError(404, 'No quests available');
    }

    res.json(quest[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRandomQuest,
};
