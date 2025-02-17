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

module.exports = {
  addFriend,
  removeFriend,
};
