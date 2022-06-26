const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/ProductController.js');
const {isAuthenticateUser} = require('../middlewares/auth');

router.get('/products',isAuthenticateUser, getProducts);

router.post('/admin/product/new', addProduct);

router.get('/products/:id', getSingleProduct);

router.put('/admin/product/:id', updateProduct);

router.delete('/admin/product/:id', deleteProduct);

module.exports = router;