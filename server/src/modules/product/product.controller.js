const Product = require( "../../models/Product" );

/**
 * GET /api/products
 * Query Params:
 * keyword
 * category
 * minPrice
 * maxPrice
 * sort
 * page
 * limit
 */
exports.getProducts = async ( req, res, next ) => {
    try {
        const {
            keyword,
            category,
            minPrice,
            maxPrice,
            sort = "newest",
            page = 1,
            limit = 12,
        } = req.query;

        const queryObject = {};

        // 🔎 Search (name + description)
        if ( keyword ) {
            queryObject.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ];
        }

        // 📂 Category filter
        if ( category ) {
            queryObject.category = category;
        }

        // 💰 Price filter
        if ( minPrice || maxPrice ) {
            queryObject.price = {};
            if ( minPrice ) queryObject.price.$gte = Number( minPrice );
            if ( maxPrice ) queryObject.price.$lte = Number( maxPrice );
        }

        // 📊 Sorting
        let sortOption = {};
        switch ( sort ) {
            case "price_asc":
                sortOption.price = 1;
                break;
            case "price_desc":
                sortOption.price = -1;
                break;
            case "rating":
                sortOption.rating = -1;
                break;
            case "oldest":
                sortOption.createdAt = 1;
                break;
            default:
                sortOption.createdAt = -1; // newest
        }

        const pageNumber = Number( page );
        const pageSize = Number( limit );

        const total = await Product.countDocuments( queryObject );

        const products = await Product.find( queryObject )
            .sort( sortOption )
            .skip( ( pageNumber - 1 ) * pageSize )
            .limit( pageSize );

        res.json( {
            products,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil( total / pageSize ),
                limit: pageSize,
            },
        } );
    } catch ( error ) {
        next( error );
    }
};

exports.getProductById = async ( req, res, next ) => {
    try {
        const product = await Product.findById( req.params.id );

        if ( !product ) {
            return res.status( 404 ).json( { message: "Product not found" } );
        }

        res.json( { product } );
    } catch ( error ) {
        next( error );
    }
};

exports.createProduct = async ( req, res, next ) => {
    try {
        const product = await Product.create( req.body );
        res.status( 201 ).json( { product } );
    } catch ( error ) {
        next( error );
    }
};

exports.updateProduct = async ( req, res, next ) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if ( !product ) {
            return res.status( 404 ).json( { message: "Product not found" } );
        }

        res.json( { product } );
    } catch ( error ) {
        next( error );
    }
};

exports.deleteProduct = async ( req, res, next ) => {
    try {
        const product = await Product.findByIdAndDelete( req.params.id );

        if ( !product ) {
            return res.status( 404 ).json( { message: "Product not found" } );
        }

        res.json( { message: "Product removed" } );
    } catch ( error ) {
        next( error );
    }
};
