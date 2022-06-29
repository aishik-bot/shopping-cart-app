const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/auth');

router.post('/order/new',isAuthenticateUser, newOrder);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);

module.exports = router;