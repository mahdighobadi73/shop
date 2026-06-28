const { body } = require( "express-validator" );

exports.productValidation = [
    body( "name" )
        .trim()
        .notEmpty()
        .withMessage( "نام محصول الزامی است" )
        .isLength( { min: 2 } )
        .withMessage( "نام محصول باید حداقل ۲ کاراکتر باشد" ),

    body( "description" )
        .trim()
        .notEmpty()
        .withMessage( "توضیحات محصول الزامی است" ),

    body( "price" )
        .notEmpty()
        .withMessage( "قیمت محصول الزامی است" )
        .isNumeric()
        .withMessage( "قیمت باید عددی باشد" )
        .custom( ( value ) => Number( value ) >= 0 )
        .withMessage( "قیمت نمی‌تواند منفی باشد" ),

    body( "image" )
        .trim()
        .notEmpty()
        .withMessage( "تصویر محصول الزامی است" ),

    body( "category" )
        .trim()
        .notEmpty()
        .withMessage( "دسته‌بندی محصول الزامی است" ),

    body( "countInStock" )
        .optional()
        .isNumeric()
        .withMessage( "موجودی باید عددی باشد" )
        .custom( ( value ) => Number( value ) >= 0 )
        .withMessage( "موجودی نمی‌تواند منفی باشد" ),

    body( "rating" )
        .optional()
        .isNumeric()
        .withMessage( "امتیاز باید عددی باشد" ),

    body( "numReviews" )
        .optional()
        .isNumeric()
        .withMessage( "تعداد نقد و بررسی باید عددی باشد" ),

    body( "isFeatured" )
        .optional()
        .isBoolean()
        .withMessage( "وضعیت ویژه بودن باید true یا false باشد" ),
];
