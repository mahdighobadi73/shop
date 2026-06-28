import api from "../../services/api";

export const productsApi = {
    getAll: async ( params = {} ) => {
        const { data } = await api.get( "/products", { params } );
        return data;
    },

    getById: async ( id ) => {
        const { data } = await api.get( `/products/${ id }` );
        return data;
    },

    create: async ( payload ) => {
        const { data } = await api.post( "/products", payload );
        return data;
    },

    update: async ( id, payload ) => {
        const { data } = await api.put( `/products/${ id }`, payload );
        return data;
    },

    remove: async ( id ) => {
        const { data } = await api.delete( `/products/${ id }` );
        return data;
    },
};
