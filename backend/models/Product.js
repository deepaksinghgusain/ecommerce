const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 Characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the product price'],
        default: 0.0,
        maxlength: [5, 'Product price cannot exceed 5 Characters']
    },
    description: {
        type: String,
        required: ['true', 'Please enter the product description']
    },
    ratings: {
        type: Number,
        default: 02
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please Select the category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, "please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'Product stock cannot exceed 5 Characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: false
            },
            ratings: {
                type: Number,
                required: false
            },
            comment: {
                type: String,
                required: false
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);