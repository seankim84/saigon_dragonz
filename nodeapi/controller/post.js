const Post = require('../model/post');
const formidable = require('formidable');
const fs = require('fs');

// post에서 postedById(그 포스트를 작성한 user) 가져오기(수정 삭제등 할 때 사용)
// for route params
exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate('postedBy', '_id name')
    .exec((err, post) => {
        if(err || !post){
            return res.status(400).json({
                error: err
            })
        }
        req.post = post
        next();
    });
};

exports.getPosts = (req, res) => {
    // populate('schema', 'the things from schemas')    
    Post.find().populate("postedBy", "_id name")
    .select('_id title body')
    .then(posts => {
        res.json({ posts })
    })
    .catch(err => console.log(err));
    /* All post were all user made */
   // Post.find().select("_id title body")
   // .then(posts => {
   //     res.status(200).json({ posts })
   // })
   // .catch(err => console.log(err));
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
    // const post = new Post(req.body);
    // post.save()
    // .then(result => {
    //     res.status(200).json({
    //         post: result
    //     })
    // })
};

exports.postByUser = (req, res) => {
    Post.find({postedBy: req.profile._id})
    .populate('postedBy', "id name") // posted의 id 와 name
    .sort('-createdAt')
    .exec((err, posts) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        };
        res.json(posts)
    });
};

