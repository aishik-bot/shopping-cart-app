const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Name cannot exceed 30 characters']
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Password must be longer than 8 characters'],
    },
    address: {
        type: String,
        required: [true, 'Enter your address'],
        minlength: [10, 'Address should be more than 10 characters']
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.methods.getJwtToken = ()=>{
    return jwt.sign({
        name: this.name,
        email: this.email
    }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
}

module.exports = mongoose.model('User', userSchema);