const asyncHandler = require( "../../utils/asyncHandler" );
const orderService = require( "./order.service" );

const createOrder = asyncHandler( async ( req, res ) => {
    const order = await orderService.createOrder( req.user._id, req.body );
    res.status( 201 ).json( { order } );
} );

const getMyOrders = asyncHandler( async ( req, res ) => {
    const orders = await orderService.getMyOrders( req.user._id );
    res.json( { orders } );
} );

const getAllOrders = asyncHandler( async ( req, res ) => {
    const orders = await orderService.getAllOrders();
    res.json( { orders } );
} );

const getOrderById = asyncHandler( async ( req, res ) => {
    const order = await orderService.getOrderById( req.params.id );
    res.json( { order } );
} );

const updateOrder = asyncHandler( async ( req, res ) => {
    const order = await orderService.updateOrder( req.params.id, req.body );
    res.json( { order } );
} );

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrder,
};
