const express = require( "express" );
const router = express.Router();

const {
    getUsers,
    updateUserRole,
    deleteUser,
} = require( "../modules/admin/admin.controller" );

const {
    protect,
    adminOnly,
} = require( "../middlewares/authMiddleware" );

router.use( protect, adminOnly );

router.get( "/users", getUsers );

router.patch( "/users/:id/role", updateUserRole );

router.delete( "/users/:id", deleteUser );

module.exports = router;
