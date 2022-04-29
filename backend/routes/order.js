const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, myOrder, allOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser,newOrder);

router.route('/order/me').get(isAuthenticatedUser,myOrder);

router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder); 

// Admin Routes
router.route('/admin/order').get(isAuthenticatedUser,authorizeRole('admin'),allOrder);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser,authorizeRole('admin'),updateOrder)
    .delete(isAuthenticatedUser,authorizeRole('admin'),deleteOrder);

module.exports = router;