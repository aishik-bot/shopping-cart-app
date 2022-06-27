const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/ProductController.js');
const {isAuthenticateUser, authorizeRoles} = require('../middlewares/auth');

router.get('/products', getProducts);

router.post('/admin/product/new',isAuthenticateUser, authorizeRoles('admin'), addProduct);

router.get('/products/:id', getSingleProduct);

router.put('/admin/product/update/:id',isAuthenticateUser, authorizeRoles('admin'), updateProduct);

router.delete('/admin/product/delete/:id',isAuthenticateUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;