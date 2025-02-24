const router = require('express').Router();
const { signup, signin } = require('../controllers/auth.controller');
const validateRequest = require('../middlewares/validateRequest');
const { signupSchema, signinSchema } = require('../utils/validationSchemas');
const upload = require('../middlewares/upload');
const validateImageDimensions = require('../middlewares/validateImageDimensions');

router.post('/signup', upload.single('avatar'), validateRequest(signupSchema), signup);
router.post('/signin', validateRequest(signinSchema), signin);

module.exports = router;
