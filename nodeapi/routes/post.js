const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controller/post');
const { requireSignin } = require('../controller/auth');
const validator = require('../validator');

router.get('/', getPosts);
router.post('/post', validator.createPostValidator, requireSignin, createPost);

module.exports = router;