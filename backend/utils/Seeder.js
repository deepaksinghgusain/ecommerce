const ProductModel = require('../models/Product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product.json');

//setting dotenv files
dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProducts = async () => {
    try{
        await ProductModel.deleteMany();
        console.log('Products are Deleted');

        await ProductModel.insertMany(products);
        console.log('All Products are added');

        process.exit();
    }catch(err){
        console.log(err.message);
        process.exit();
    }
}

seedProducts();