const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controller/post')
const validator = require('../validator');

router.get('/', getPosts);
router.post('/post', validator.createPostValidator, createPost);

module.exports = router;