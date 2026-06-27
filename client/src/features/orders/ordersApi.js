import api from "../../services/api";

export const ordersApi = {
    create: ( payload ) => api.post( "/orders", payload ).then( ( res ) => res.data ),
    myOrders: () => api.get( "/orders/my" ).then( ( res ) => res.data ),
    adminList: () => api.get( "/admin/orders" ).then( ( res ) => res.data ),
    adminUpdate: ( id, payload ) =>
        api.put( `/admin/orders/${ id }`, payload ).then( ( res ) => res.data ),
};
