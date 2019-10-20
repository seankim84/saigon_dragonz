const express = require('express');
const router = express.Router();
const { postById, getPosts, createPost, postByUser } = require('../controller/post');
const { requireSignin } = require('../controller/auth');
const { userById } = require('../controller/user'); 
const validator = require('../validator');

router.get('/', getPosts);
router.post('/post/new/:userId', 
    requireSignin, 
    
    createPost,
    validator.createPostValidator
); 
router.get('/post/by/:userId', requireSignin ,postByUser);

router.param('userId',userById);
router.param('postId', postById)
 
module.exports = router;