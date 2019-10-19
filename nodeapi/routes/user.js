const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controller/auth');
const { userById, allUsers, getUser } = require('../controller/user');

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);

router.param('userId', userById); // 앞에 'userId'를 param으로 사용

module.exports = router;