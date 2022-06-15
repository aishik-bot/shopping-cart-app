const mongoose = require('mongoose');

const connectDb = async (databaseUrl)=>{
    try{
        await mongoose.connect(databaseUrl);
        console.log("Database connected successfully")
    }
    catch(error){
        console.log("Connection to database failed");
        console.log(error.message)
    }
}

module.exports = connectDb;