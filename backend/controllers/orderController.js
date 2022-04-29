const OrderModel = require('../models/order');
const ProductModel = require('../models/product');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create a new order 
exports.newOrder = catchAsyncError(async (req, res, next) =>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    const order = await OrderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

//Get Single Order 
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id).populate('user','name email');

    if(!order) {
        return next(new ErrorHandler('No Order found with this id'),404);
    }

    res.status(200).json({
        success: true,
        order
    });
})

//Get my Order 
exports.myOrder = catchAsyncError(async (req, res, next) => {
    const orders = await OrderModel.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
})

//Get All Order 
exports.allOrder = catchAsyncError(async (req, res, next) => {
    const orders = await OrderModel.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update Order
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order'),400);
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
    })
})

// Update Product Quantity
async function updateStock(id, quantity) {
    const product = await ProductModel.findById(id);

    if(product) {
        product.stock = product.stock - quantity;
        await product.save({ validateBeforeSave: false });
    }
}

//Delete Order 
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler('No Order found with this id'),404);
    }

    await order.remove();

    res.status(200).json({
        success: true
    });
})