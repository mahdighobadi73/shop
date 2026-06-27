const express = require( "express" );
const router = express.Router();

const orderController = require( "../modules/order/order.controller" );
const { protect, adminOnly } = require( "../middlewares/authMiddleware" );
const { orderValidation } = require( "../modules/order/order.validation" );
const validate = require( "../validations/validate" );

router.post( "/", protect, orderValidation, validate, orderController.createOrder );
router.get( "/my", protect, orderController.getMyOrders );
router.get( "/admin/all", protect, adminOnly, orderController.getAllOrders );
router.get( "/:id", protect, orderController.getOrderById );
router.put( "/:id", protect, adminOnly, orderController.updateOrder );

module.exports = router;
