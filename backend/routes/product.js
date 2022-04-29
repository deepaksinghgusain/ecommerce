const express = require('express')
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview, 
    getProductReviews,
    deleteReview
} = require('../controllers/ProductController');

const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

router.route('/products').get(isAuthenticatedUser, authorizeRole('admin'), getProducts);

router.route('/products/:id').get(getSingleProduct);

router.route('/products/new').post(isAuthenticatedUser, authorizeRole('admin'), newProduct);

router.route('/products/update/:id').put(isAuthenticatedUser, authorizeRole('admin'), updateProduct);

router.route('/products/delete/:id').delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews/:id').get(isAuthenticatedUser, getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;