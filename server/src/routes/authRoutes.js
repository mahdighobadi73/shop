const express = require( "express" );
const router = express.Router();

const authController = require( "../modules/auth/auth.controller" );
const { protect } = require( "../middlewares/authMiddleware" );
const {
    registerValidation,
    loginValidation,
} = require( "../modules/auth/auth.validation" );
const validate = require( "../validations/validate" );

router.post( "/register", registerValidation, validate, authController.register );
router.post( "/login", loginValidation, validate, authController.login );
router.get( "/me", protect, authController.me );
router.post( "/logout", protect, authController.logout );

module.exports = router;
