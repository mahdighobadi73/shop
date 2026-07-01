import { useOrdersStore } from "./ordersStore";

export const useOrders = () => {
    const orders = useOrdersStore( ( state ) => state.orders );
    const currentOrder = useOrdersStore( ( state ) => state.currentOrder );
    const isLoading = useOrdersStore( ( state ) => state.isLoading );
    const error = useOrdersStore( ( state ) => state.error );
    const createOrder = useOrdersStore( ( state ) => state.createOrder );
    const fetchMyOrders = useOrdersStore( ( state ) => state.fetchMyOrders );
    const fetchAdminOrders = useOrdersStore( ( state ) => state.fetchAdminOrders );
    const updateOrder = useOrdersStore( ( state ) => state.updateOrder );

    return {
        orders,
        currentOrder,
        isLoading,
        error,
        createOrder,
        fetchMyOrders,
        fetchAdminOrders,
        updateOrder,
    };
};
