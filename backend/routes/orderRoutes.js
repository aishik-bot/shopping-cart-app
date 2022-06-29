const express = require('express');
const router = express.Router();

const { newOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/auth');

router.post('/order/new',isAuthenticateUser, newOrder);

module.exports = router;