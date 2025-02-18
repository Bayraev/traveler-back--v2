const router = require('express').Router();
const { completeQuest } = require('../controllers/user.controller');
const validateRequest = require('../middlewares/validateRequest');
const { questCompletionSchema } = require('../utils/validationSchemas');
const User = require('../models/User');
const friendController = require('../controllers/friend.controller');

// router.post('/:userId/quests', validateRequest(questCompletionSchema), completeQuest);

// Add new friend
router.post('/:userId/add-friend/:friendUsername', friendController.addFriend);

// Remove friend
router.delete('/:userId/friends/:username', friendController.removeFriend);

// Get user's friends
router.get('/:userId/friends', friendController.getFriends);

module.exports = router;
