const asyncHandler = require( "../../utils/asyncHandler" );
const authService = require( "./auth.service" );

const register = asyncHandler( async ( req, res ) => {
    const result = await authService.register( req.body );
    res.status( 201 ).json( result );
} );

const login = asyncHandler( async ( req, res ) => {
    const result = await authService.login( req.body );
    res.json( result );
} );

const me = asyncHandler( async ( req, res ) => {
    const result = await authService.me( req.user._id );
    res.json( result );
} );

const logout = asyncHandler( async ( req, res ) => {
    res.json( { message: "Logged out successfully" } );
} );

module.exports = { register, login, me, logout };
