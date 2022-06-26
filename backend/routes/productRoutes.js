const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/ProductController.js');
const {isAuthenticateUser} = require('../middlewares/auth');

router.get('/products', getProducts);

router.post('/admin/product/new',isAuthenticateUser, addProduct);

router.get('/products/:id', getSingleProduct);

router.put('/admin/product/:id',isAuthenticateUser, updateProduct);

router.delete('/admin/product/:id',isAuthenticateUser, deleteProduct);

module.exports = router;