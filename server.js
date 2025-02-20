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

const { PORT, CLIENT_URL, CLIENT_URL2 } = process.env;

// Middleware
app.use(
  cors({
    origin: '*', // Allow all origins (for testing only)
    // credentials: true, // Still allow cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.options('*', cors()); // Allow preflight requests globally

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  //* FOR LOGS
  if (req) {
    console.log(req.originalUrl);
    if (req.body) {
      console.log(req.body);
    }
  }
  next(createError(404, 'Ошибка 404!'));
});

// Error handler
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) {
    console.log('Ошибка при соединении с сервером', error.message);
  }
  console.log(`Успех: сервер прослушивается на порту: ${PORT}`);
});

module.exports = app;
