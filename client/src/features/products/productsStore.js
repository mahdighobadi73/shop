import { create } from "zustand";
import { productsApi } from "./productsApi";

export const useProductsStore = create( ( set ) => ( {
    products: [],
    currentProduct: null,
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        set( { isLoading: true, error: null } );
        try {
            const data = await productsApi.getAll();
            const products = Array.isArray( data ) ? data : data.products || [];
            set( { products, isLoading: false } );
            return products;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    fetchProductById: async ( id ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await productsApi.getById( id );
            const product = data?.product || data;
            set( { currentProduct: product, isLoading: false } );
            return product;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    createProduct: async ( payload ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await productsApi.create( payload );
            const created = data?.product || data;
            set( ( state ) => ( {
                products: [ created, ...state.products ],
                isLoading: false,
            } ) );
            return created;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    updateProduct: async ( id, payload ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await productsApi.update( id, payload );
            const updated = data?.product || data;
            set( ( state ) => ( {
                products: state.products.map( ( p ) => ( p._id === id ? updated : p ) ),
                currentProduct:
                    state.currentProduct && state.currentProduct._id === id
                        ? updated
                        : state.currentProduct,
                isLoading: false,
            } ) );
            return updated;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    deleteProduct: async ( id ) => {
        set( { isLoading: true, error: null } );
        try {
            await productsApi.remove( id );
            set( ( state ) => ( {
                products: state.products.filter( ( p ) => p._id !== id ),
                isLoading: false,
            } ) );
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },
} ) );
