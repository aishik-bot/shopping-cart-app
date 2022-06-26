require('dotenv').config();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
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

        // const token = jwt.sign({
        //     name: name,
        //     email: email
        //   },
        //   process.env.JWT_SECRET_KEY,
        //   {
        //     expiresIn: '1d'
        // }
        // )

        const document = newUSer.save();
        // res.status(200).json({
        //     success: true,
        //     message: "User is registered",
        //     newUSer,
        //     token
        // })

        sendToken(user, 200, res);
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
            sendToken(user, 200, res);
        } 
        else{
            res.status(400).json({ success: false, message: "Login unsuccessful" });
        }
    }
}

module.exports = {
    userRegister,
    userLogin
}
