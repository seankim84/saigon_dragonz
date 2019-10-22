const express = require('express');
const router = express.Router();
const {
    postById,
    isPoster,
    getPosts,
    createPost,
    postByUser,
    deletePost,
    updatePost
} = require('../controller/post');
const { requireSignin } = require('../controller/auth');
const { userById } = require('../controller/user'); 
const validator = require('../validator');

router.get('/posts', getPosts);
router.post('/post/new/:userId', 
    requireSignin, 
    createPost,
    validator.createPostValidator
); 
router.get('/post/by/:userId', requireSignin ,postByUser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

router.param('userId',userById);
router.param('postId', postById)
 
module.exports = router;