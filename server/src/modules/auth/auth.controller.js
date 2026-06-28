const jwt = require( "jsonwebtoken" );
const User = require( "../../models/User" );
const { jwtSecret } = require( "../../config/config" );

const generateToken = ( id ) => {
    return jwt.sign( { id }, jwtSecret, {
        expiresIn: "30d",
    } );
};

const sanitizeUser = ( user ) => ( {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
} );

exports.register = async ( req, res, next ) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne( { email } );

        if ( existingUser ) {
            return res.status( 400 ).json( {
                message: "این ایمیل قبلاً ثبت شده است",
            } );
        }

        const user = await User.create( {
            name,
            email,
            password,
        } );

        const token = generateToken( user._id );

        return res.status( 201 ).json( {
            message: "ثبت‌نام با موفقیت انجام شد",
            token,
            user: sanitizeUser( user ),
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.login = async ( req, res, next ) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne( { email } ).select( "+password" );

        if ( !user ) {
            return res.status( 401 ).json( {
                message: "ایمیل یا رمز عبور اشتباه است",
            } );
        }

        const isMatch = await user.matchPassword( password );

        if ( !isMatch ) {
            return res.status( 401 ).json( {
                message: "ایمیل یا رمز عبور اشتباه است",
            } );
        }

        const token = generateToken( user._id );

        return res.json( {
            message: "ورود با موفقیت انجام شد",
            token,
            user: sanitizeUser( user ),
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.me = async ( req, res, next ) => {
    try {
        return res.json( {
            user: sanitizeUser( req.user ),
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.logout = async ( req, res ) => {
    return res.json( {
        message: "خروج با موفقیت انجام شد",
    } );
};
