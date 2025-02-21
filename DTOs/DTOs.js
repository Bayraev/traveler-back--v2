const { addApiUrl } = require('../utils/imageUrl');
const User = require('../models/User');

/**
 * Generic API success response wrapper
 * @template T
 * @param {T} data - Response data
 * @param {number} status - HTTP status code
 * @param {string} message - Success message
 * @returns {ApiResponse<T>} Formatted API response
 */
const ApiResponse = (data, status = 200, message = 'Success') => ({
  data,
  status,
  message,
});

/**
 * Generic API error response wrapper
 * @param {string} error - Error details
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {ApiResponseError} Formatted error response
 */
const ApiError = (error, status = 400, message = 'Error occurred') => ({
  error,
  status,
  message,
});

/**
 * Formats quest completion data
 * @param {Object} quest - Quest completion data
 * @returns {QuestCompletion} Formatted quest completion
 */
const questCompletionDTO = (quest) => ({
  _id: quest._id,
  country: quest.country,
  city: quest.city,
  description: quest.description,
  photoUrl: addApiUrl(quest.photoUrl),
  images: addApiUrl(quest.images),
  coupon: quest.coupon,
  completionDate: quest.completionDate,
});

/**
 * Formats user data
 * @param {Object} user - User document
 * @returns {User} Formatted user data
 */
const userDTO = (user) => {
  if (!user) return null;

  return {
    _id: user._id,
    username: user.username,
    avatar: addApiUrl(user.avatar),
    completedQuests: user.completedQuests?.map(questCompletionDTO) || [],
    friends: user.friends?.map((f) => f.userId) || [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Formats friend data with actual user info
 * @param {Object} friend - Friend document
 * @returns {Promise<Friend>} Formatted friend data
 */
const friendDTO = async (friend) => {
  if (!friend) return null;

  // Get actual user data for friend
  const friendUser = await User.findById(friend.userId);
  if (!friendUser) return null;

  return {
    _id: friend._id,
    userId: friend.userId,
    username: friendUser.username,
    avatar: addApiUrl(friendUser.avatar),
    addedAt: friend.addedAt,
  };
};

module.exports = {
  ApiResponse,
  ApiError,
  userDTO,
  friendDTO,
  questCompletionDTO,
};
