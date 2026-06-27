const { body } = require( "express-validator" );

const productValidation = [
    body( "name" ).notEmpty().withMessage( "Name is required" ),
    body( "description" ).notEmpty().withMessage( "Description is required" ),
    body( "price" ).isNumeric().withMessage( "Price must be a number" ),
    body( "image" ).notEmpty().withMessage( "Image is required" ),
    body( "category" ).notEmpty().withMessage( "Category is required" ),
    body( "countInStock" )
        .isNumeric()
        .withMessage( "Count in stock must be a number" ),
];

module.exports = { productValidation };
