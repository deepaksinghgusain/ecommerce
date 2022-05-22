const ProductModel = require('../models/Product');
const ErrorHandler = require('../utils/ErrorHandler');
const CatchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');

// Create New Product
exports.newProduct = CatchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await ProductModel.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// Get All Product
exports.getProducts = CatchAsyncError(async (req, res, next) => {

    const resPerPage = 4;

    const productCount = await ProductModel.countDocuments();

    const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;

    let filterProductCount = products.length;

    apiFeatures.pagination(resPerPage);

    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products,
        resPerPage,
        filterProductCount
    })

});

// Get Single Product
exports.getSingleProduct = CatchAsyncError(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update Product
exports.updateProduct = CatchAsyncError(async (req, res, next) => {

    let product = await ProductModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product
exports.deleteProduct = CatchAsyncError(async (req, res, next) => {

    let product = await ProductModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found'), 404);
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

// Create new Review
exports.createProductReview = CatchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await ProductModel.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
})

// Get Product Review
exports.getProductReviews = CatchAsyncError(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);

    res.send({
        success: true,
        reviews: product.reviews
    });
})

// Delete Product Reviews
exports.deleteReview = CatchAsyncError(async (req, res, next) => {
    console.log(req.params);
    const product = await ProductModel.findById(req.params.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.params.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await ProductModel.findByIdAndUpdate(req.params.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({ success: true })
})