import { create } from "zustand";
import { ordersApi } from "./ordersApi";

export const useOrdersStore = create( ( set ) => ( {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,

    createOrder: async ( payload ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await ordersApi.create( payload );
            const order = data?.order || data;
            set( { currentOrder: order, isLoading: false } );
            return order;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    fetchMyOrders: async () => {
        set( { isLoading: true, error: null } );
        try {
            const data = await ordersApi.myOrders();
            const orders = Array.isArray( data ) ? data : data.orders || [];
            set( { orders, isLoading: false } );
            return orders;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    fetchAdminOrders: async () => {
        set( { isLoading: true, error: null } );
        try {
            const data = await ordersApi.adminList();
            const orders = Array.isArray( data ) ? data : data.orders || [];
            set( { orders, isLoading: false } );
            return orders;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    updateOrder: async ( id, payload ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await ordersApi.adminUpdate( id, payload );
            const updated = data?.order || data;
            set( ( state ) => ( {
                orders: state.orders.map( ( order ) =>
                    order._id === id ? updated : order
                ),
                isLoading: false,
            } ) );
            return updated;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },
} ) );
