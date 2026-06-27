const express = require( "express" );
const router = express.Router();

const productController = require( "../modules/product/product.controller" );
const { protect, adminOnly } = require( "../middlewares/authMiddleware" );
const { productValidation } = require( "../modules/product/product.validation" );
const validate = require( "../validations/validate" );

router.get( "/", productController.getProducts );
router.get( "/:id", productController.getProductById );
router.post(
    "/",
    protect,
    adminOnly,
    productValidation,
    validate,
    productController.createProduct
);
router.put(
    "/:id",
    protect,
    adminOnly,
    productValidation,
    validate,
    productController.updateProduct
);
router.delete( "/:id", protect, adminOnly, productController.deleteProduct );

module.exports = router;
