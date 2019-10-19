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
    // 사용이유: 로그인은 되었지만 자기 개인정보를 변경하려고할때 내 자신이 맞는지 체크
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
};

exports.getUser = (req, res) => {
    req.profile.hashedPassword  = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile) 
};