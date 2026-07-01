const User = require( "../../models/User" );

exports.getUsers = async ( req, res, next ) => {
    try {

        const users = await User.find()
            .select( "-password" )
            .sort( { createdAt: -1 } );

        res.json( users );

    } catch ( error ) {
        next( error );
    }
};

exports.updateUserRole = async ( req, res, next ) => {
    try {

        const { role } = req.body;

        const user = await User.findById( req.params.id );

        if ( !user ) {
            return res.status( 404 ).json( {
                message: "User not found",
            } );
        }

        user.role = role;

        await user.save();

        res.json( {
            message: "Role updated",
        } );

    } catch ( error ) {
        next( error );
    }
};

exports.deleteUser = async ( req, res, next ) => {
    try {

        const user = await User.findById( req.params.id );

        if ( !user ) {
            return res.status( 404 ).json( {
                message: "User not found",
            } );
        }

        await user.deleteOne();

        res.json( {
            message: "User deleted",
        } );

    } catch ( error ) {
        next( error );
    }
};
