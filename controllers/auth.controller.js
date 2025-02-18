const createError = require('http-errors');
const User = require('../models/User');
const { DTO } = require('../DTOs/DTOs');

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw createError(409, 'Имя пользователя занято');
    }

    console.log('debug');
    const user = new User({ username, password });
    await user.save();
    console.log('debug2', user);
    const userObject = user.toObject();
    const dtoUser = DTO(userObject, null);

    res.status(201).json(dtoUser);
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      throw createError(401, 'Логин или пароль не верны!');
    }

    const userObject = user.toObject();
    const dtoUser = DTO(userObject, null);

    console.log(dtoUser);
    res.status(200).json(dtoUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
