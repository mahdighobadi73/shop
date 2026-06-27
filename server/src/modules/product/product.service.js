const Product = require( "../../models/Product" );
const AppError = require( "../../utils/AppError" );

const getProducts = async () => {
    return Product.find().sort( { createdAt: -1 } );
};

const getProductById = async ( id ) => {
    const product = await Product.findById( id );
    if ( !product ) throw new AppError( "Product not found", 404 );
    return product;
};

const createProduct = async ( data ) => {
    return Product.create( data );
};

const updateProduct = async ( id, data ) => {
    const product = await Product.findByIdAndUpdate( id, data, {
        new: true,
        runValidators: true,
    } );
    if ( !product ) throw new AppError( "Product not found", 404 );
    return product;
};

const deleteProduct = async ( id ) => {
    const product = await Product.findByIdAndDelete( id );
    if ( !product ) throw new AppError( "Product not found", 404 );
    return product;
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
