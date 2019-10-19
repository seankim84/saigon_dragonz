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
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized) {
        return res.status(403).json({ //403 means unAuthorized 
            error: "이 User는 이곳에 접근권한이 없습니다"
        });
    };
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if(err){
            res.status(400).json({
                error: err
            });
        };
        res.json({users})
    }).select('name email updatedAt createdAt');
}