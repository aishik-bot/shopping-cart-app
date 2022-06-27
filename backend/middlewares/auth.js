const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuthenticateUser = async (req, res, next)=>{
    const {token} = req.cookies;
    //console.log(token);

    if(!token){
        res.status(401).json({
            success: false,
            message: "Login to access this route"
        })
    }
    else{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //const decoded = await jwt.decode(token)
        console.log({decoded});
        req.user = await User.findOne({email: decoded.email});
        console.log('user: '+req.user.name);
        next();
    }
}

const authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                success: false,
                message: "User not allowed access"
            })
        }
        else{
            next();
        }
    }
}

module.exports = {
    isAuthenticateUser,
    authorizeRoles
}