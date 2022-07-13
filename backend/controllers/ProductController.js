const Product = require('../models/product.js');
const ApiFeatures = require('../utils/apiFeatures');

const addProduct = async (req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
        success:true,
        product
    })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getProducts = async (req, res)=>{
    const resultsPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resultsPerPage);

    const products = await apiFeatures.query;
    
    setTimeout(() => {
        res.status(200).json({
            success: true,
            resultsPerPage,
            productsCount,
            products
        })
    }, 2000);
}


const getSingleProduct = async (req, res)=>{
    const product = await Product.findById(req.params.id);
    try {
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
    } catch (error) {
        res.json({
            message: "Error occured",
            error
        })
    }
}

const getAdminProducts = async (req, res)=>{
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
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

const getProductReviews = async (req, res)=>{
    try {
        const product = await Product.findById(req.query.id) ;
        
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error.message
        })
    }
}

module.exports = { getProducts, addProduct, getSingleProduct, getAdminProducts ,updateProduct, deleteProduct, createProductReview, getProductReviews }