const friendService = require('../services/friend.service');
const { DTO } = require('../DTOs/DTOs');

// Add a new friend for both users
const addFriend = async (req, res) => {
  try {
    const { userId, friendUsername } = req.params;
    const result = await friendService.addFriend(userId, friendUsername);
    res.json(result);
  } catch (error) {
    res.status(400).json(DTO(null, error.message));
  }
};

// Remove friendship between users
const removeFriend = async (req, res) => {
  try {
    const { userId, username } = req.params;
    const result = await friendService.removeFriend(userId, username);
    res.json(result);
  } catch (error) {
    res.status(400).json(DTO(null, error.message));
  }
};

/**
 * Get all friends for a user
 * Returns array of friends with their details
 */
const getFriends = async (req, res) => {
  try {
    const friends = await friendService.getFriends(req.params.userId);
    res.json(DTO(friends, null));
  } catch (error) {
    res.status(400).json(DTO(null, error.message));
  }
};

module.exports = {
  addFriend,
  removeFriend,
  getFriends,
};
