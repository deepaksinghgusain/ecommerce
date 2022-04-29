const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateProfile,
    allUsers,
    getUserDetail,
    updateUserById,
    deleteUserById
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/me').get(isAuthenticatedUser,getUserDetails);

router.route('/me/update').put(isAuthenticatedUser,updateProfile)

router.route('/password/update').put(isAuthenticatedUser,updatePassword);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

/**
 * Admin Routes
 */
router.route('/admin/users').get(isAuthenticatedUser,authorizeRole('admin'),allUsers);

router.route('/admin/user/:id')
    .get(isAuthenticatedUser,authorizeRole('admin'),getUserDetail)
    .put(isAuthenticatedUser,authorizeRole('admin'),updateUserById)
    .delete(isAuthenticatedUser,authorizeRole('admin'),deleteUserById);

module.exports = router;