const asyncHandler = require( "../../utils/asyncHandler" );
const productService = require( "./product.service" );

const getProducts = asyncHandler( async ( req, res ) => {
    const products = await productService.getProducts();
    res.json( { products } );
} );

const getProductById = asyncHandler( async ( req, res ) => {
    const product = await productService.getProductById( req.params.id );
    res.json( { product } );
} );

const createProduct = asyncHandler( async ( req, res ) => {
    const product = await productService.createProduct( req.body );
    res.status( 201 ).json( { product } );
} );

const updateProduct = asyncHandler( async ( req, res ) => {
    const product = await productService.updateProduct( req.params.id, req.body );
    res.json( { product } );
} );

const deleteProduct = asyncHandler( async ( req, res ) => {
    await productService.deleteProduct( req.params.id );
    res.json( { message: "Product deleted" } );
} );

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
