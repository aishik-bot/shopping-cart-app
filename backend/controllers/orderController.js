const OrderModel = require('../models/order');
const ProductModel = require('../models/product');
const UserModel = require('../models/user')

const newOrder = async (req, res)=>{
    try {
        const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo } = req.body;
        const user = await UserModel.findOne({email: req.user.email});
        const order = await OrderModel.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: user.id  
        })

        res.status(200).json({
            success: true,
            message: "New order added successfully",
            order
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}

const getSingleOrder = async (req, res)=>{
    try {
        const order = await OrderModel.findById(req.params.id).populate('user','name email');
        if(!order){
            throw "no order found with this id"
        }
        else{
            res.status(200).json({
                success: true,
                message: "order found",
                order
            })
        }
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}


module.exports = {
    newOrder,
    getSingleOrder
}