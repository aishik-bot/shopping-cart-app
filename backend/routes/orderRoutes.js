const express = require("express");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

//getUserOrder
router.route("/myorders").get(isAuthenticateUser, getMyOrders);
//get order by id
router.route("/:id").get(isAuthenticateUser, getOrderById);
//craete new order
router.route("/order").post(isAuthenticateUser, addOrderItem);
//update order
router.route("/:id/pay").put(isAuthenticateUser,authorizeRoles('admin'), updateOrderToPaid);
module.exports = router;