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
    User.find(req.body.email)
    //If error or no user

    //If user found, user Authenticated(generate the token with id and secret)

    // persist the token as 't' in cookie with expiry day (* Need to 'cookie-parser' *)

    // return response with User and token to frontend client

    

}