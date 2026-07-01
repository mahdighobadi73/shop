const path = require( "path" );
require( "dotenv" ).config( {
    path: path.resolve( __dirname, "../.env" ),
} );

const mongoose = require( "mongoose" );
const User = require( "../src/models/User" );

const run = async () => {
    const uri = process.env.MONGO_URI;

    if ( !uri ) {
        console.error( "❌ MONGO_URI not loaded" );
        process.exit( 1 );
    }

    try {
        console.log( "⏳ Connecting to MongoDB..." );

        await mongoose.connect( uri );

        console.log( "✅ MongoDB connected" );

        const exists = await User.findOne( {
            email: "mahdi.ghobadi73@gmail.com",
        } );

        if ( !exists ) {
            await User.create( {
                name: "Admin",
                email: "mahdi.ghobadi73@gmail.com",
                password: "123456",
                role: "admin",
            } );

            console.log( "✅ Admin created" );
        } else {
            console.log( "⚠️ Admin already exists" );
        }

        await mongoose.disconnect();
        process.exit();
    } catch ( err ) {
        console.error( "❌ Mongo error:", err.message );
        process.exit( 1 );
    }
};

run();