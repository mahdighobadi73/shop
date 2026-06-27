import { create } from "zustand";
import { authApi } from "./authApi";

const tokenFromStorage = localStorage.getItem( "token" );
const userFromStorage = localStorage.getItem( "user" );

export const useAuthStore = create( ( set, get ) => ( {
    user: userFromStorage ? JSON.parse( userFromStorage ) : null,
    token: tokenFromStorage || null,
    isAuthenticated: !!tokenFromStorage,
    isLoading: false,
    error: null,

    login: async ( payload ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await authApi.login( payload );
            const token = data?.token || null;
            const user = data?.user || null;

            if ( token ) localStorage.setItem( "token", token );
            if ( user ) localStorage.setItem( "user", JSON.stringify( user ) );

            set( {
                token,
                user,
                isAuthenticated: true,
                isLoading: false,
            } );

            return data;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    register: async ( payload ) => {
        set( { isLoading: true, error: null } );
        try {
            const data = await authApi.register( payload );
            const token = data?.token || null;
            const user = data?.user || null;

            if ( token ) localStorage.setItem( "token", token );
            if ( user ) localStorage.setItem( "user", JSON.stringify( user ) );

            set( {
                token,
                user,
                isAuthenticated: true,
                isLoading: false,
            } );

            return data;
        } catch ( error ) {
            set( { isLoading: false, error: error.message } );
            throw error;
        }
    },

    logout: async () => {
        try {
            await authApi.logout();
        } catch ( _ ) { }

        localStorage.removeItem( "token" );
        localStorage.removeItem( "user" );
        set( {
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        } );
    },

    fetchMe: async () => {
        const token = get().token || localStorage.getItem( "token" );
        if ( !token ) return null;

        set( { isLoading: true, error: null } );
        try {
            const data = await authApi.me();
            const user = data?.user || data;

            localStorage.setItem( "user", JSON.stringify( user ) );
            set( {
                user,
                isAuthenticated: true,
                isLoading: false,
            } );

            return user;
        } catch ( error ) {
            localStorage.removeItem( "token" );
            localStorage.removeItem( "user" );
            set( {
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: error.message,
            } );
            return null;
        }
    },
} ) );
