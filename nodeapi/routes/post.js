const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controller/post');
const { requireSignin } = require('../controller/auth');
const { userById } = require('../controller/user'); 
const validator = require('../validator');

router.get('/', getPosts);
router.post('/post', requireSignin, validator.createPostValidator, createPost);

router.param('userId', userById);
 
module.exports = router;