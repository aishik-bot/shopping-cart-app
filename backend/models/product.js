const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type : String, required : true},
    price:{type : Number, required : true, default: 0.0},
    description:{type : String, required: true},
    ratings:{type : Number, default : 0},
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type : String, 
        required : true,
        enum:{
            values:[
                'Electronics',
                'Mobiles',
                'Laptops',
                'Clothing',
                'Accessories',
                'Books',
                'Food',
                'Headphones',
                'Cameras'
            ],
            message: "Please select correct category for this product"
        }
    },
    seller:{
        type : String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            name:{type:String, required: true},
            rating:{type:Number, required: true},
            comment:{type:String, required: true}
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);