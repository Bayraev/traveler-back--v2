const router = require('express').Router();
const questController = require('../controllers/quest.controller');
const upload = require('../middlewares/upload');

// Get random quest for user
router.get('/:userId/random', questController.getRandomQuest);

// Complete quest with photo proof
router.post('/:userId/complete', upload.array('images', 10), questController.completeQuest);

// Get current quest for user
router.get('/:userId/current', questController.getCurrentQuest);

// Get all completed quests for user
router.get('/:userId/all', questController.getAllQuests);

module.exports = router;
