const { body } = require( "express-validator" );

exports.orderValidation = [
    body( "orderItems" )
        .isArray( { min: 1 } )
        .withMessage( "حداقل یک محصول باید در سفارش وجود داشته باشد" ),

    body( "orderItems.*.product" )
        .notEmpty()
        .withMessage( "شناسه محصول الزامی است" ),

    body( "orderItems.*.name" )
        .notEmpty()
        .withMessage( "نام محصول الزامی است" ),

    body( "orderItems.*.qty" )
        .isNumeric()
        .withMessage( "تعداد محصول باید عددی باشد" )
        .custom( ( value ) => Number( value ) > 0 )
        .withMessage( "تعداد محصول باید بیشتر از صفر باشد" ),

    body( "orderItems.*.price" )
        .isNumeric()
        .withMessage( "قیمت محصول باید عددی باشد" ),

    body( "orderItems.*.image" )
        .notEmpty()
        .withMessage( "تصویر محصول الزامی است" ),

    body( "shippingAddress.address" )
        .notEmpty()
        .withMessage( "آدرس الزامی است" ),

    body( "shippingAddress.city" )
        .notEmpty()
        .withMessage( "شهر الزامی است" ),

    body( "shippingAddress.postalCode" )
        .notEmpty()
        .withMessage( "کد پستی الزامی است" ),

    body( "shippingAddress.country" )
        .notEmpty()
        .withMessage( "کشور الزامی است" ),

    body( "paymentMethod" )
        .notEmpty()
        .withMessage( "روش پرداخت الزامی است" ),

    body( "itemsPrice" )
        .isNumeric()
        .withMessage( "قیمت محصولات باید عددی باشد" ),

    body( "shippingPrice" )
        .isNumeric()
        .withMessage( "هزینه ارسال باید عددی باشد" ),

    body( "taxPrice" )
        .isNumeric()
        .withMessage( "مالیات باید عددی باشد" ),

    body( "totalPrice" )
        .isNumeric()
        .withMessage( "قیمت نهایی باید عددی باشد" ),
];
