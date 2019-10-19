const User = require('../model/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "이 _id의 유저를 찾을 수 없습니다"
            });
        } 
        req.profile = user; // this is the userId
        next();
    })
}