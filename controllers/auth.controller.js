const createError = require('http-errors');
const User = require('../models/User');
const { ApiResponse, ApiError, userDTO } = require('../DTOs/DTOs');

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json(ApiError('Username already exists', 409, 'Имя пользователя занято'));
    }

    const imagePath = req.file.path || '';
    const user = new User({ username, password, avatar: '/' + imagePath });
    await user.save();

    const formattedUser = userDTO(user);
    res.status(201).json(ApiResponse(formattedUser, 201, 'Пользователь успешно зарегистрирован'));
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json(ApiError('Invalid credentials', 401, 'Логин или пароль не верны!'));
    }

    const formattedUser = userDTO(user);
    res.json(ApiResponse(formattedUser, 200, 'Успешный вход в систему'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
