const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your name'],
        maxLength: [30, 'Your name must be at least 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter the valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter your password'],
        minlength: [6, 'Your password must be at least 6 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

//Jwt Token 
userSchema.methods.getJwtToken = function () {  
    return jwt.sign({
        id: this._id 
    }, process.env.JWT_SECRET,{
        expiresIn: '24h'
    })
}

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    //Generate Token 
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and Set to reset password token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set Token expire time
    this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);