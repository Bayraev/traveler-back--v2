const router = require('express').Router();
const { getRandomQuest } = require('../controllers/quest.controller');

router.get('/random', getRandomQuest);

module.exports = router;
