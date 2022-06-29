//importing dependencies
require('dotenv').config({path:__dirname+'/.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

const connectDb = require('./connectDb.js');

//importing routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(cookieParser())
//env variables
const port = process.env.PORT || 4000;
const databaseUrl = process.env.DATABASE_URL;

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

//connecting to the database
connectDb(databaseUrl);

app.get('/',(req, res)=>{
    res.send("Server running");
})


//listening to the server
app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
    console.log(`Visit http://localhost:${port}`);
})