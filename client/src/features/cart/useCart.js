import { useCartStore } from "./cartStore";

export const useCart = () => {
    const items = useCartStore( ( state ) => state.items );
    const addItem = useCartStore( ( state ) => state.addItem );
    const removeItem = useCartStore( ( state ) => state.removeItem );
    const updateQuantity = useCartStore( ( state ) => state.updateQuantity );
    const clearCart = useCartStore( ( state ) => state.clearCart );
    const getSubtotal = useCartStore( ( state ) => state.getSubtotal );
    const getTotalItems = useCartStore( ( state ) => state.getTotalItems );

    return {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        getTotalItems,
    };
};
