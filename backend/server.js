const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// Handle unhandled promise exceptions
process.on('uncaughtException', err=> {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the server due to unhandled promise exceptions');
    process.exit(1);
    
})

// Setting up config files
dotenv.config({path: 'backend/config/config.env'})

//set up cloudinary 
cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY,
})

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise exceptions
process.on('uncaughtException', err=> {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the server due to unhandled promise exceptions')
    server.close(() => {
        process.exit(1);
    });
})