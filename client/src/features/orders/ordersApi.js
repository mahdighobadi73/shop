import api from "../../services/api";

export const ordersApi = {
    create: ( payload ) => api.post( "/orders", payload ),

    myOrders: () => api.get( "/orders/my" ),

    adminList: () => api.get( "/orders/admin/all" ),

    adminUpdate: ( id, payload ) => api.put( `/orders/${ id }`, payload ),
};
