import { create } from "zustand";
import { authApi } from "./authApi";

export const useAuthStore = create( ( set, get ) => ( {
    user: null,
    token: localStorage.getItem( "token" ),
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async ( payload ) => {
        set( { isLoading: true, error: null } );

        try {
            const data = await authApi.login( payload );

            const token = data?.token;

            if ( token ) {
                localStorage.setItem( "token", token );
            }

            set( {
                token,
                isAuthenticated: true,
                isLoading: false,
            } );

            // 🔥 مهم: همیشه بعد از login کاربر واقعی را از سرور بگیر
            await get().fetchMe();

            return data;
        } catch ( error ) {
            set( {
                isLoading: false,
                error: error.message,
            } );
            throw error;
        }
    },

    register: async ( payload ) => {
        set( { isLoading: true, error: null } );

        try {
            const data = await authApi.register( payload );

            const token = data?.token;

            if ( token ) {
                localStorage.setItem( "token", token );
            }

            set( {
                token,
                isAuthenticated: true,
                isLoading: false,
            } );

            await get().fetchMe();

            return data;
        } catch ( error ) {
            set( {
                isLoading: false,
                error: error.message,
            } );
            throw error;
        }
    },

    logout: async () => {
        try {
            await authApi.logout();
        } catch ( _ ) { }

        localStorage.removeItem( "token" );

        set( {
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        } );
    },

    fetchMe: async () => {
        const token = get().token;

        if ( !token ) return null;

        set( { isLoading: true } );

        try {
            const data = await authApi.me();

            const user = data?.user || data;

            set( {
                user,
                isAuthenticated: true,
                isLoading: false,
            } );

            return user;
        } catch ( error ) {
            localStorage.removeItem( "token" );

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