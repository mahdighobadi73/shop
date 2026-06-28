const { body } = require( "express-validator" );

exports.registerValidation = [
    body( "name" )
        .trim()
        .notEmpty()
        .withMessage( "نام الزامی است" )
        .isLength( { min: 2 } )
        .withMessage( "نام باید حداقل ۲ کاراکتر باشد" ),

    body( "email" )
        .trim()
        .notEmpty()
        .withMessage( "ایمیل الزامی است" )
        .isEmail()
        .withMessage( "ایمیل معتبر نیست" )
        .normalizeEmail(),

    body( "password" )
        .notEmpty()
        .withMessage( "رمز عبور الزامی است" )
        .isLength( { min: 6 } )
        .withMessage( "رمز عبور باید حداقل ۶ کاراکتر باشد" ),
];

exports.loginValidation = [
    body( "email" )
        .trim()
        .notEmpty()
        .withMessage( "ایمیل الزامی است" )
        .isEmail()
        .withMessage( "ایمیل معتبر نیست" )
        .normalizeEmail(),

    body( "password" )
        .notEmpty()
        .withMessage( "رمز عبور الزامی است" ),
];
