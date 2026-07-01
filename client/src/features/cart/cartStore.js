import { create } from "zustand";
import { cartStorage } from "./cartStorage";

export const useCartStore = create( ( set, get ) => ( {
    items: cartStorage.load(),

    addItem: ( product, quantity = 1 ) => {
        const items = [ ...get().items ];
        const index = items.findIndex( ( item ) => item._id === product._id );

        if ( index >= 0 ) {
            items[ index ] = {
                ...items[ index ],
                quantity: items[ index ].quantity + quantity,
            };
        } else {
            items.push( {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                countInStock: product.countInStock ?? 0,
                quantity,
            } );
        }

        cartStorage.save( items );
        set( { items } );
    },

    removeItem: ( id ) => {
        const items = get().items.filter( ( item ) => item._id !== id );
        cartStorage.save( items );
        set( { items } );
    },

    updateQuantity: ( id, quantity ) => {
        const items = get().items
            .map( ( item ) =>
                item._id === id ? { ...item, quantity: Math.max( 1, quantity ) } : item
            )
            .filter( ( item ) => item.quantity > 0 );

        cartStorage.save( items );
        set( { items } );
    },

    clearCart: () => {
        cartStorage.clear();
        set( { items: [] } );
    },

    getSubtotal: () =>
        get().items.reduce( ( sum, item ) => sum + item.price * item.quantity, 0 ),

    getTotalItems: () =>
        get().items.reduce( ( sum, item ) => sum + item.quantity, 0 ),
} ) );
