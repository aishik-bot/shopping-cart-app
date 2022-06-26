const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuthenticateUser = async (req, res, next)=>{
    const {token} = req.cookies;
    //console.log(token);

    if(!token){
        res.status(401).json({
            success: false,
            message: "Login to access products"
        })
    }
    else{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = User.find({email: decoded.email});

        next();
    }
}

module.exports = {
    isAuthenticateUser
}