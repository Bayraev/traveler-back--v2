require('dotenv').config();
const mongoose = require('mongoose');
const migrateCurrentQuests = require('../migrations/addCoordinatesToCurrentQuest');
const migrateCompletedQuests = require('../migrations/addCommentToCompletedQuests');

const runMigrations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await migrateCurrentQuests();
    await migrateCompletedQuests();

    console.log('All migrations completed');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.connection.close();
  }
};

runMigrations();
