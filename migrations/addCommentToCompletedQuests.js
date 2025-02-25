const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Migration to add comment field to all completed quests
 * Sets default comment for existing completed quests
 */
const migrateCompletedQuests = async () => {
  try {
    console.log('Starting migration: Adding comment field to completed quests...');

    // Get all users with completed quests
    const users = await User.find({ 'completedQuests.0': { $exists: true } });
    console.log(`Found ${users.length} users with completed quests`);

    for (const user of users) {
      // Update each completed quest that doesn't have a comment
      const updatedQuests = user.completedQuests.map((quest) => ({
        ...quest.toObject(),
        comment: quest.comment || 'Quest completed successfully', // Default comment
      }));

      // Update user's completed quests
      await User.findByIdAndUpdate(user._id, {
        completedQuests: updatedQuests,
      });

      console.log(`Updated completed quests for user ${user._id}`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

module.exports = migrateCompletedQuests;
