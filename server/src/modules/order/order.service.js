const Order = require( "../../models/Order" );
const AppError = require( "../../utils/AppError" );

const createOrder = async ( userId, data ) => {
    if ( !data.orderItems || data.orderItems.length === 0 ) {
        throw new AppError( "No order items", 400 );
    }

    const order = await Order.create( {
        user: userId,
        ...data,
    } );

    return order;
};

const getMyOrders = async ( userId ) => {
    return Order.find( { user: userId } ).sort( { createdAt: -1 } );
};

const getAllOrders = async () => {
    return Order.find().populate( "user", "name email" ).sort( { createdAt: -1 } );
};

const getOrderById = async ( id ) => {
    const order = await Order.findById( id ).populate( "user", "name email" );
    if ( !order ) throw new AppError( "Order not found", 404 );
    return order;
};

const updateOrder = async ( id, data ) => {
    const order = await Order.findByIdAndUpdate( id, data, {
        new: true,
        runValidators: true,
    } );
    if ( !order ) throw new AppError( "Order not found", 404 );
    return order;
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrder,
};
