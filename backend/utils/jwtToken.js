const sendToken = (user, statusCode, res, token)=>{
    //const token = user.getJwtToken();

    //cookie options
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIES_EXPIRE_TIME*24*60*60*1000   //time in miliseconds
        ),
        httpOnly : true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token, 
        user
    })
}

module.exports = sendToken