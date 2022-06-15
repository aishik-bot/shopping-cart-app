const Product = require('../models/product.js');

const getProducts = async (req, res, next)=>{
    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        product_count: products.length,
        products
    })
}

const addProduct = async (req, res, next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

const getSingleProduct = async (req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    else{
        res.status(200).json({
            success: true,
            product
        })
    }
}

const updateProduct = async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    else{
        product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            success: true,
            product
        })
    }
}

const deleteProduct = async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    else{
        product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted"
        })
    }
}

module.exports = { getProducts, addProduct, getSingleProduct, updateProduct, deleteProduct }