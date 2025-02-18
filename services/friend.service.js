const User = require('../models/User');

/**
 * Adds a friend relationship between two users
 * @param {string} userId - ID of the user adding a friend
 * @param {string} friendUsername - Username of the friend to add
 * @returns {Object} Message confirming friend addition
 * @throws {Error} If user not found or other validation errors
 */
const addFriend = async (userId, friendUsername) => {
  const friend = await User.findOne({ username: friendUsername });
  if (!friend) throw new Error('Пользователь не найден');

  const currentUser = await User.findById(userId);
  if (!currentUser) throw new Error('Текущий пользователь не найден');

  // Check if already friends
  const alreadyFriends = currentUser.friends.some((f) => f.username === friendUsername);
  if (alreadyFriends) throw new Error('Пользователи уже друзья');

  const friendDTO = friendDTO(friend);

  // Add friend to current user
  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      friends: {
        id: currentUser._id,
      },
    },
  });

  // Add current user to friend's friends list
  await User.findByIdAndUpdate(friend._id, {
    $addToSet: {
      friends: {
        id: friend._id,
      },
    },
  });

  return { data: { ...friendDTO }, error: null };
};

/**
 * Removes a friend relationship between two users
 * @param {string} userId - ID of the user removing a friend
 * @param {string} friendUsername - Username of the friend to remove
 * @returns {Object} Message confirming friend removal
 * @throws {Error} If user not found or other validation errors
 */
const removeFriend = async (userId, friendUsername) => {
  const friend = await User.findOne({ username: friendUsername });
  if (!friend) throw new Error('Пользователь не найден');

  const currentUser = await User.findById(userId);
  if (!currentUser) throw new Error('Текущий пользователь не найден');

  // Remove friend from current user
  await User.findByIdAndUpdate(userId, {
    $pull: { friends: { username: friendUsername } },
  });

  // Remove current user from friend's friends list
  await User.findByIdAndUpdate(friend._id, {
    $pull: { friends: { username: currentUser.username } },
  });

  return { message: 'Друг удален' };
};

/**
 * Gets all friends for specified user
 * @param {string} userId - User ID to get friends for
 * @returns {Array} Array of user's friends with their details
 * @throws {Error} If user not found
 */
const getFriends = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Пользователь не найден');

  return user.friends || [];
};

module.exports = {
  addFriend,
  removeFriend,
  getFriends,
};
