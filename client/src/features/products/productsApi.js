import api from "../../services/api";

export const productsApi = {
    getAll: () => api.get( "/products" ).then( ( res ) => res.data ),
    getById: ( id ) => api.get( `/products/${ id }` ).then( ( res ) => res.data ),
    create: ( payload ) => api.post( "/admin/products", payload ).then( ( res ) => res.data ),
    update: ( id, payload ) =>
        api.put( `/admin/products/${ id }`, payload ).then( ( res ) => res.data ),
    remove: ( id ) => api.delete( `/admin/products/${ id }` ).then( ( res ) => res.data ),
};
