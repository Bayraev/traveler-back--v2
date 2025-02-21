const friendService = require('../services/friend.service');
const { ApiResponse, ApiError } = require('../DTOs/DTOs');

// Add a new friend for both users
const addFriend = async (req, res) => {
  try {
    const { userId, friendUsername } = req.params;
    const friend = await friendService.addFriend(userId, friendUsername);
    res.status(200).json(ApiResponse(friend, 200, 'Друг успешно добавлен'));
  } catch (error) {
    res.status(400).json(ApiError(error.message, 400, 'Ошибка при добавлении друга'));
  }
};

// Remove friendship between users
const removeFriend = async (req, res) => {
  try {
    const { userId, username } = req.params;
    await friendService.removeFriend(userId, username);
    res.status(200).json(ApiResponse(null, 200, 'Друг успешно удален'));
  } catch (error) {
    res.status(400).json(ApiError(error.message, 400, 'Ошибка при удалении друга'));
  }
};

/**
 * Get all friends for a user
 * Returns array of friends with their details
 */
const getFriends = async (req, res) => {
  try {
    const friends = await friendService.getFriends(req.params.userId);
    res.status(200).json(ApiResponse(friends, 200, 'Список друзей получен'));
  } catch (error) {
    res.status(400).json(ApiError(error.message, 400, 'Ошибка при получении списка друзей'));
  }
};

module.exports = {
  addFriend,
  removeFriend,
  getFriends,
};
