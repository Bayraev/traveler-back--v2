const router = require('express').Router();
const { completeQuest } = require('../controllers/user.controller');
const validateRequest = require('../middlewares/validateRequest');
const { questCompletionSchema } = require('../utils/validationSchemas');
const User = require('../models/User');
const friendController = require('../controllers/friend.controller');
const upload = require('../middlewares/upload');
const validateImageDimensions = require('../middlewares/validateImageDimensions');
const userController = require('../controllers/user.controller');

// router.post('/:userId/quests', validateRequest(questCompletionSchema), completeQuest);

// Update profile picture
router.put(
  '/:userId/avatar',
  upload.single('avatar'),
  validateImageDimensions,
  userController.updateProfilePicture,
);

// Add new friend
router.post('/:userId/add-friend/:friendUsername', friendController.addFriend);

// Remove friend
router.delete('/:userId/friends/:username', friendController.removeFriend);

// Get user's friends
router.get('/:userId/friends', friendController.getFriends);

module.exports = router;
