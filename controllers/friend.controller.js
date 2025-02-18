const friendService = require('../services/friend.service');

// Add a new friend for both users
const addFriend = async (req, res) => {
  try {
    const { userId, friendUsername } = req.params;

    const result = await friendService.addFriend(userId, friendUsername);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove friendship between users
const removeFriend = async (req, res) => {
  try {
    const { userId, username } = req.params;

    const result = await friendService.removeFriend(userId, username);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all friends for a user
 * Returns array of friends with their details
 */
const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const friends = await friendService.getFriends(userId);

    res.json({
      data: friends,
      error: null,
    });
  } catch (error) {
    res.json({
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  addFriend,
  removeFriend,
  getFriends,
};
