const router = require('express').Router();
const { signup, signin } = require('../controllers/auth.controller');
const validateRequest = require('../middlewares/validateRequest');
const { signupSchema, signinSchema } = require('../utils/validationSchemas');

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/signin', validateRequest(signinSchema), signin);

module.exports = router;
