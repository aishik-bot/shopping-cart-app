//importing dependencies
require('dotenv').config({path:__dirname+'/.env'});
const express = require('express');
const app = express();

const connectDb = require('./connectDb.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//env variables
const port = process.env.PORT || 4000;
const databaseUrl = process.env.DATABASE_URL;

app.use('/api', productRoutes);
app.use('/api', userRoutes);

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