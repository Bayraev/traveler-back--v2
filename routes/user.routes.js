const router = require('express').Router();
const { completeQuest } = require('../controllers/user.controller');
const validateRequest = require('../middlewares/validateRequest');
const { questCompletionSchema } = require('../utils/validationSchemas');

router.post('/:userId/quests', validateRequest(questCompletionSchema), completeQuest);

module.exports = router;
