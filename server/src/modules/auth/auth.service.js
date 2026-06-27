const User = require( "../../models/User" );
const generateToken = require( "../../utils/generateToken" );
const AppError = require( "../../utils/AppError" );

const register = async ( { name, email, password } ) => {
    const exists = await User.findOne( { email } );
    if ( exists ) throw new AppError( "Email already exists", 400 );

    const user = await User.create( { name, email, password } );

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token: generateToken( { id: user._id } ),
    };
};

const login = async ( { email, password } ) => {
    const user = await User.findOne( { email } ).select( "+password" );
    if ( !user ) throw new AppError( "Invalid email or password", 401 );

    const isMatch = await user.matchPassword( password );
    if ( !isMatch ) throw new AppError( "Invalid email or password", 401 );

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token: generateToken( { id: user._id } ),
    };
};

const me = async ( userId ) => {
    const user = await User.findById( userId );
    if ( !user ) throw new AppError( "User not found", 404 );

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

module.exports = { register, login, me };
