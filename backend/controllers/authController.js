const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const { sendToken } = require('../utils/jwtToken');
const { sendMail } = require('../utils/sendMail');
const crypto = require('crypto');

// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {


    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'fdafdasf',
            url: 'https://sdfdgfsdf'
        }
    });

    sendToken(user, 200, res);
});

// Login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are entered correctly
    if (!email || !password) {
        return next(new ErrorHandler('Please entered the valid email and password', 400));
    }

    // Finding user in database
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid Email and Password', 401));
    }

    //check password is correct or not
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return next(new ErrorHandler('Invalid Email and Password', 401));
    }

    sendToken(user, 200, res);
});

// Get Loged in user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');
    
    //Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if(!isMatched) {
        return next(new ErrorHandler('Old Password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({success:true});
});

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    //Get reset Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is as follow:\n\n${resetUrl}\n\n if you have not requested this email, then ignore it.`;

    try {

        await sendMail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message
        });


        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    //hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if(!user) {
        return next(new ErrorHandler('Password reset token is valid or has been expired', 400));
    }

    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// Logout 
exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logout out'
    })
}

//get All Users
exports.allUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get User Detail by id
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next( new ErrorHandler(`User Does not found with id ${req.params.id}`) );
    }

    res.status(200).json({
        success: true,
        user
    })
});

// Upate User by Admin using Id
exports.updateUserById = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //update avatar
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({success:true});
});

// Delete User By Admin by Id
exports.deleteUserById = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next( new ErrorHandler(`User Does not found with id ${req.params.id}`) );
    }

    await user.remove();

    res.status(200).json({
        success: true
    })
});