const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, myOrders, allOrders, deleteOrder, updateOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/auth');

router.post('/order/new',isAuthenticateUser, newOrder);
router.get('/order/me', isAuthenticateUser, myOrders);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);
router.get('/admin/order/all', isAuthenticateUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id')
        .put(isAuthenticateUser, authorizeRoles('admin'), updateOrder)
        .delete(isAuthenticateUser, authorizeRoles('admin'), deleteOrder)

module.exports = router;