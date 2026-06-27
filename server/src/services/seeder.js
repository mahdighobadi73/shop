const mongoose = require( "mongoose" );
const dotenv = require( "dotenv" );
const connectDB = require( "../config/db" );
const Product = require( "../models/Product" );
const User = require( "../models/User" );

dotenv.config();

const seed = async () => {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    await User.create( {
        name: "Admin",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
    } );

    const products = [
        {
            name: "T-Shirt",
            description: "Comfortable cotton t-shirt",
            price: 25,
            image: "https://via.placeholder.com/600x400",
            category: "Clothing",
            countInStock: 10,
            isFeatured: true,
        },
        {
            name: "Sneakers",
            description: "Daily wear sneakers",
            price: 80,
            image: "https://via.placeholder.com/600x400",
            category: "Shoes",
            countInStock: 15,
            isFeatured: true,
        },
    ];

    await Product.insertMany( products );

    console.log( "Data seeded successfully" );
    process.exit();
};

seed().catch( ( error ) => {
    console.error( error );
    process.exit( 1 );
} );
