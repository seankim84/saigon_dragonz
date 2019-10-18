const jwt = require('jsonwebtoken');

require('dotenv').config();
const User = require('../model/user');

exports.signup = async (req, res) => {
    try {
        const userExists = await User.findOne({
            email: req.body.email
        })
        if (userExists) return res.status(403).json({
            error: "이미 사용 중인 Email 입니다"
        });
        const user = await new User(req.body);
        await user.save();
        res.status(200).json({
            message: "Signup success! Please Login"
        });
    }
    catch(err){
        if(err){
            return console.log(err)
        }
    }
};

exports.singin = (req, res) => {
    //find the user based on the Email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => { //user = User model을 받아온다
        // If error or no user
        if(err || !user){
            return res.status(401).json({ // 401 means unAuthorized
                error: 'Email이 등록되지 않았습니다 회원가입을 해주세요'
            })
        };
        // if user is found make sure the email and password matched;
        // create authentication method in model and use here
        if(!user.authenticated(password)){ // authenticatedf는 User methods 로부터 정의
            return res.status(401).json({
                error: "비밀번호가 일치하지 않습니다"
            })
        };
        //If user found, user Authenticated(generate the token with id and secret)
        // generate the token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry day (* Need to 'cookie-parser' *)
        res.cookie("t", token, {expire: new Date() + 9999})
        // return response with User and token to frontend client
        const { _id, name, email } = user;
        return res.json({ token, user: {_id, email, name} })
    })

   




    

}