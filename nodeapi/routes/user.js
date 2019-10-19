const express = require('express');
const router = express.Router();
const { userById, allUsers } = require('../controller/user');

router.get('/users', allUsers);

router.param('userId', userById);

module.exports = router;