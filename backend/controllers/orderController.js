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


const myOrders = async (req, res)=>{
    try {
        //console.log("req.user email: "+req.user.email);
        const user = await UserModel.findOne({email: req.user.email});
        //console.log({user})
        const orders = await OrderModel.find({user: user._id});
        if(!orders){ 
            throw "No orders to show"
        }
        else{
            res.status(200).json({
                success : true,
                orders
            })
        }
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}

const allOrders = async (req, res)=>{
    const orders = await OrderModel.find();

    let totalAmount = 0
    orders.forEach(order=>{
        totalAmount += order.totalPrice 
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}

const updateOrder = async (req, res)=>{
    try {
        const order=await OrderModel.findById(req.params.id)
        if(!order){
            throw "No order found with that id"
        }
        if(order.orderStatus==='Delivered'){
            throw "Order already delivered"
        }
        order.orderItems.forEach(async item =>{
                await updateStock(item.product, item.quantity)
        })
        order.orderStatus=req.body.status,
        order.deliveredAt = Date.now()
        await order.save()
        res.status(200).json({
            success:true,
            message: "order details updated"
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

async function updateStock(id, quantity){
    const product =await ProductModel.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave: false})
}

const deleteOrder = async (req, res)=>{
    try {
        const order = await OrderModel.findById(req.params.id);
        if(!order){
            throw "No order found with that id"
        }
        else{
            await order.remove()
            res.status(200).json({
                success : true,
                message: "Order deleted"
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
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder
}