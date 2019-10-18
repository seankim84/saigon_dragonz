const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: String,
    about: {
        type: String,
        trim: true
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

// virtual field
userSchema.virtual('password')
.set(function (password) {
    // create temporary varialble called_password
    this._password = password 
    // generate a timestamp
    this.salt = uuidv1();
    // encryptPassword(); -> 아래에 method 정의
    this.hashedPassword = this.encryptPassword(password)

})
.get(() => { this._password });

// methods
userSchema.methods = {
    // authenticate가 되기위해선 plainText(입력받은 비밀번호) 가 hashedPassword와 일치해야한다
    authenticated: function(plainText) { // userInput === plainText
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    encryptPassword: function(password){
        if(!password){
            return ""
        }
        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = mongoose.model("User", userSchema);