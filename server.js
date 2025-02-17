require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.routes');
const questRoutes = require('./routes/quest.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, (error) => {
  if (error) {
    console.log('Ошибка при соединении с сервером', error.message);
  }
  console.log(`Успех: сервер прослушивается на порту: ${PORT}`);
});

module.exports = app;
