const router = require('express').Router();
const questController = require('../controllers/quest.controller');
const upload = require('../middlewares/upload');

// Get random quest for user
router.get('/:userId/random', questController.getRandomQuest);

// Complete quest with photo proof
router.post('/:userId/complete', upload.array('images', 5), questController.completeQuest);

module.exports = router;
