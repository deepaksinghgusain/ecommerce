const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

// Handle unhandled promise exceptions
process.on('uncaughtException', err=> {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the server due to unhandled promise exceptions');
    process.exit(1);
    
})

// Setting up config files
dotenv.config({path: 'backend/config/config.env'})

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