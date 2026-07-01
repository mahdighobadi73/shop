import { create } from "zustand";
import { productsApi } from "./productsApi";

export const useProductsStore = create( ( set ) => ( {
    products: [],
    currentProduct: null,
    pagination: null,

    isLoading: false,
    error: null,

    fetchProducts: async ( params = {} ) => {
        try {
            set( { isLoading: true, error: null } );

            const res = await productsApi.getAll( params );

            set( {
                products: res.products,
                pagination: res.pagination,
                isLoading: false,
            } );
        } catch ( error ) {
            set( {
                error: error.message || "خطا در دریافت محصولات",
                isLoading: false,
            } );
        }
    },

    fetchProductById: async ( id ) => {
        try {
            set( { isLoading: true } );

            const res = await productsApi.getById( id );

            set( {
                currentProduct: res.product,
                isLoading: false,
            } );
        } catch ( error ) {
            set( {
                error: error.message,
                isLoading: false,
            } );
        }
    },

    createProduct: async ( data ) => {
        try {
            const res = await productsApi.create( data );

            set( ( state ) => ( {
                products: [ res.product, ...state.products ],
            } ) );

            return res.product;
        } catch ( error ) {
            set( { error: error.message } );
        }
    },

    updateProduct: async ( id, data ) => {
        try {
            const res = await productsApi.update( id, data );

            set( ( state ) => ( {
                products: state.products.map( ( p ) =>
                    p._id === id ? res.product : p
                ),
            } ) );

            return res.product;
        } catch ( error ) {
            set( { error: error.message } );
        }
    },

    deleteProduct: async ( id ) => {
        try {
            await productsApi.remove( id );

            set( ( state ) => ( {
                products: state.products.filter( ( p ) => p._id !== id ),
            } ) );
        } catch ( error ) {
            set( { error: error.message } );
        }
    },
} ) );
