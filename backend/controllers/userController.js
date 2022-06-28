require('dotenv').config();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');

const userRegister = async (req, res)=>{
    const {name, email, password, address} = req.body;
    console.log(req.body);

    const user = await UserModel.findOne({email:email});

    if(user){
        res.status(409).json({
            success: false,
            message: "User with that email already exists"
        })
    }
    else if(name && email && password && address){
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUSer = new UserModel({
            name: name,
            email: email,
            password: encryptedPassword,
            address: address
        });

        const token = jwt.sign({
            name: name,
            email: email
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d'
        }
        )

        const document = newUSer.save();
        // res.status(200).json({
        //     success: true,
        //     message: "User is registered",
        //     newUSer,
        //     token
        // })

        sendToken(user, 200, res, token);
    }
    else{
        res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
}

const userLogin = async (req, res)=>{
    const { email , password } = req.body;

    if(!email || !password){
        res.status(400).json({
            success: false,
            message: "Not entered email or password"
        })
    }

    const user = await UserModel.findOne({
        email: email,
    });

    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid login"
        })
    }
    else{
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );
    
        if (isPasswordValid){
            const token = jwt.sign({
                name: user.name,
                email: user.email
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: '1d'
            }
            )
            sendToken(user, 200, res, token);
        } 
        else{
            res.status(400).json({ success: false, message: "Login unsuccessful" });
        }
    }
}

const userLogout = async (req, res)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'logged out successfully'
    })
}

const getUserProfile = async (req, res)=>{
    const user = await UserModel.find({email: req.user.email}, {_id: 0, }); //exclude id and password of user
    //console.log('from user controller '+req.user.email)

    res.status(200).json({
        success: true,
        user
    })
}

const updatePassword = async (req, res)=>{
    const user = await UserModel.findOne({email: req.user.email});

    const isMatched = await bcrypt.compare(req.body.oldpassword, user.password);
    if(!isMatched){
        res.status(400).json({
            success: false,
            message: "Incorrect old password"
        })
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.newpassword, salt);
        user.password = encryptedPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    }
}

const updateProfile = async (req, res)=>{
    const updates = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    }
    const user = await UserModel.findOneAndUpdate({email: req.user.email}, updates)

    res.status(200).json({
        success: true,
        message: "profile updated"
    })
}

const allUsers = async (req,res)=>{
    const users=await UserModel.find();
    res.status(200).json({
        success: true,
        users
    })
}
module.exports = {
    userRegister,
    userLogin,
    userLogout,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers
}
