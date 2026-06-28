const Order = require( "../../models/Order" );
const Product = require( "../../models/Product" );

exports.createOrder = async ( req, res, next ) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = req.body;

        if ( !orderItems || orderItems.length === 0 ) {
            return res.status( 400 ).json( {
                message: "سبد خرید خالی است",
            } );
        }

        for ( const item of orderItems ) {
            const product = await Product.findById( item.product );

            if ( !product ) {
                return res.status( 404 ).json( {
                    message: `محصول ${ item.name } پیدا نشد`,
                } );
            }

            if ( product.countInStock < item.qty ) {
                return res.status( 400 ).json( {
                    message: `موجودی ${ product.name } کافی نیست`,
                } );
            }
        }

        const order = await Order.create( {
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } );

        for ( const item of orderItems ) {
            await Product.findByIdAndUpdate( item.product, {
                $inc: { countInStock: -item.qty },
            } );
        }

        return res.status( 201 ).json( {
            message: "سفارش با موفقیت ثبت شد",
            order,
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.getMyOrders = async ( req, res, next ) => {
    try {
        const orders = await Order.find( { user: req.user._id } )
            .sort( { createdAt: -1 } )
            .lean();

        return res.json( {
            orders,
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.getAllOrders = async ( req, res, next ) => {
    try {
        const orders = await Order.find( {} )
            .populate( "user", "name email" )
            .sort( { createdAt: -1 } )
            .lean();

        return res.json( {
            orders,
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.getOrderById = async ( req, res, next ) => {
    try {
        const order = await Order.findById( req.params.id ).populate(
            "user",
            "name email"
        );

        if ( !order ) {
            return res.status( 404 ).json( {
                message: "سفارش پیدا نشد",
            } );
        }

        const isOwner = order.user._id.toString() === req.user._id.toString();
        const isAdmin = req.user.role === "admin";

        if ( !isOwner && !isAdmin ) {
            return res.status( 403 ).json( {
                message: "اجازه دسترسی به این سفارش را ندارید",
            } );
        }

        return res.json( {
            order,
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.updateOrder = async ( req, res, next ) => {
    try {
        const order = await Order.findById( req.params.id );

        if ( !order ) {
            return res.status( 404 ).json( {
                message: "سفارش پیدا نشد",
            } );
        }

        const {
            status,
            isPaid,
            isDelivered,
        } = req.body;

        if ( status !== undefined ) {
            order.status = status;
        }

        if ( isPaid !== undefined ) {
            order.isPaid = isPaid;
            order.paidAt = isPaid ? new Date() : undefined;
        }

        if ( isDelivered !== undefined ) {
            order.isDelivered = isDelivered;
            order.deliveredAt = isDelivered ? new Date() : undefined;
        }

        const updatedOrder = await order.save();

        return res.json( {
            message: "سفارش با موفقیت بروزرسانی شد",
            order: updatedOrder,
        } );
    } catch ( error ) {
        next( error );
    }
};
