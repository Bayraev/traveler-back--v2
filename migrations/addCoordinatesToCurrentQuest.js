const mongoose = require('mongoose');
const User = require('../models/User');
const World = require('../models/World');

/**
 * Migration to add coordinates field to all current quests
 * Uses city coordinates from World collection as default values
 */
const migrateCurrentQuests = async () => {
  try {
    console.log('Starting migration: Adding coordinates to current quests...');

    // Get all users with current quests
    const users = await User.find({ currentQuest: { $exists: true, $ne: null } });
    console.log(`Found ${users.length} users with current quests`);

    for (const user of users) {
      // Find matching city in World collection
      const world = await World.findOne({
        'cities.city': user.currentQuest.city,
      });

      if (!world) continue;

      const city = world.cities.find((c) => c.city === user.currentQuest.city);
      if (!city) continue;

      // Update user's current quest with coordinates
      await User.findByIdAndUpdate(user._id, {
        'currentQuest.coordinates': {
          latitude: city.coordinates.latitude,
          longitude: city.coordinates.longitude,
          zoom: city.coordinates.zoom || 12,
        },
      });

      console.log(`Updated coordinates for user ${user._id}'s current quest`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

module.exports = migrateCurrentQuests;
