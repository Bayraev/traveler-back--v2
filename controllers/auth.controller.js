const authService = require('../services/auth.service');
const { ApiResponse, ApiError, userDTO } = require('../DTOs/DTOs');

const signup = async (req, res, next) => {
  try {
    if (!req.file && req.body.avatar) {
      return res.status(400).json(ApiError('Avatar file is required', 400, 'Аватар обязателен'));
    }

    const user = await authService.signup(req.body, req.file);
    const formattedUser = userDTO(user);

    res.status(201).json(ApiResponse(formattedUser, 201, 'Пользователь успешно зарегистрирован'));
  } catch (error) {
    if (error.message === 'Username already exists') {
      return res
        .status(409)
        .json(ApiError('Username already exists', 409, 'Имя пользователя занято'));
    }
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await authService.signin(username, password);
    const formattedUser = userDTO(user);

    res.json(ApiResponse(formattedUser, 200, 'Успешный вход в систему'));
  } catch (error) {
    res.status(401).json(ApiError('Invalid credentials', 401, 'Логин или пароль не верны!'));
  }
};

module.exports = {
  signup,
  signin,
};
