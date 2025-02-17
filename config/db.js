const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');

    // Warning for development environment
    if (process.env.NODE_ENV !== 'production') {
      console.warn('SECURITY WARNING: Passwords stored in plaintext');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
