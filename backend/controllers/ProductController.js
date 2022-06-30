const Product = require('../models/product.js');
const ApiFeatures = require('../utils/apiFeatures');

const addProduct = async (req, res)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

const getProducts = async (req, res)=>{
    const resultsPerPage = 3;
    const prodCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resultsPerPage);

    const products = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        count: products.length,
        prodCount,
        products
    })
}


const getSingleProduct = async (req, res)=>{
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

const updateProduct = async (req, res)=>{
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

const deleteProduct = async (req, res )=>{
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

const createProductReview = async (req, res)=>{
    try {
        const { rating, comment, productId } = req.body;

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(
            r => r.name == req.user.name
        )

        if(isReviewed){
            product.reviews.forEach(review=>{
                if(review.name === req.user.name){
                    review.comment = comment,
                    review.rating = rating
                }
            })
        }
        else{
            product.reviews.push(review);
            product.numOfReview = product.reviews.length
        }

        product.ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0) / product.reviews.length ;

        await product.save({validateBeforeSave: false})

        res.status(200).json({
            success: true,
            message: "review is added"
        })
    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error.message
        })
    }
}

module.exports = { getProducts, addProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview }