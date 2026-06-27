const express = require( "express" );
const router = express.Router();

router.use( "/auth", require( "./authRoutes" ) );
router.use( "/products", require( "./productRoutes" ) );
router.use( "/orders", require( "./orderRoutes" ) );

module.exports = router;
