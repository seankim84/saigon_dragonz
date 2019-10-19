const express = require('express');
const { signup, signin, signout } = require('../controller/auth');
const { userById } = require('../controller/user');
const { userSignupValidator } = require('../validator');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param('userId', userById);

module.exports = router;
