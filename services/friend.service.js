const { friendDTO, DTO } = require('../DTOs/DTOs');
const User = require('../models/User');

class FriendService {
  /**
   * Adds a friend relationship between two users
   * @param {string} userId - ID of the user adding a friend
   * @param {string} friendUsername - Username of the friend to add
   * @returns {Object} Message confirming friend addition
   * @throws {Error} If user not found or other validation errors
   */
  async addFriend(userId, friendUsername) {
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) throw new Error('Пользователь не найден');

    const currentUser = await User.findById(userId);
    if (!currentUser) throw new Error('Текущий пользователь не найден');

    // Check if already friends
    const alreadyFriends = currentUser.friends.some((f) => f.username === friendUsername);
    if (alreadyFriends) throw new Error('Пользователи уже друзья');

    const friendDTOted = friendDTO(friend);

    // Add friend to current user
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        friends: {
          id: friend._id,
          username: friend.username,
          avatar: friend.avatar,
        },
      },
    });

    // Add current user to friend's friends list
    await User.findByIdAndUpdate(friend._id, {
      $addToSet: {
        friends: {
          id: currentUser._id,
          username: currentUser.username,
          avatar: currentUser.avatar,
        },
      },
    });

    const response = DTO(friendDTOted, null);

    return response;
  }

  /**
   * Removes a friend relationship between two users
   * @param {string} userId - ID of the user removing a friend
   * @param {string} friendUsername - Username of the friend to remove
   * @returns {Object} Message confirming friend removal
   * @throws {Error} If user not found or other validation errors
   */
  async removeFriend(userId, friendUsername) {
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
  }

  /**
   * Gets all friends for specified user
   * @param {string} userId - User ID to get friends for
   * @returns {Array} Array of user's friends with their details
   * @throws {Error} If user not found
   */
  async getFriends(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('Пользователь не найден');

    return user.friends || [];
  }
}

module.exports = new FriendService();
