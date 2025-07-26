const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysqlpool = require('./config/database');

//configure dotenv
dotenv.config();

//rest objects
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 8000;

//routes
app.use('/api/v1/student', require('./routes/studentRoutes'));
app.get('/test1', (req, res) => {
    res.status(200).send( 'Server is working!')
});

//contiduionly listen
mysqlpool.query('SELECT 1').then(() => {
    //my sql
    console.log('My Sql database is Connected');
    app.listen(PORT,() =>{
    console.log(`Successful Connected ${process.env.PORT}`.bgWhite.black);
});
}).catch((error) => {
    console.error(error);
});