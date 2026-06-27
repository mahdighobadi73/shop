const mongoose = require( "mongoose" );

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        image: { type: String, required: true },
        category: { type: String, required: true, trim: true },
        countInStock: { type: Number, required: true, min: 0, default: 0 },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

productSchema.pre( "validate", function ( next ) {
    if ( this.name ) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace( /[^a-z0-9]+/g, "-" )
            .replace( /^-+|-+$/g, "" );
    }
    next();
} );

module.exports = mongoose.model( "Product", productSchema );
