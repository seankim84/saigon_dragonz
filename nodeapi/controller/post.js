const Post = require('../model/post');
const formidable = require('formidable');
const fs = require('fs');

// post에서 postedById(그 포스트를 작성한 user) 가져오기(수정 삭제등 할 때 사용)
exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate('postedBy', '_id name')
    .exec((err, post) => {
        if(err || !post){
            return res.status(400).json({
                error: err
            })
        }
        req.post = post // 이 부분 중요!(user.js에서 req.profile 과 같은 부분) 
         next();
    });
   
};

// 해당  포스트의 주인인지 아닌지 확인
exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    console.log(req.auth);
    console.log(req.post.postedBy._id);
    if (!isPoster) {
        return res.status(403).json({
            error: "당신은 이 동작을 수행할 권한이 없습니다"
        });
    }
    next();
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Post deleted successfully'
        });
    });
}


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
    Post.find({ postedBy: req.profile._id })
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

