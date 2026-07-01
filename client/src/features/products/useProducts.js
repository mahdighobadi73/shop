import { useProductsStore } from "./productsStore";

export const useProducts = () => {
    const products = useProductsStore( ( state ) => state.products );
    const currentProduct = useProductsStore( ( state ) => state.currentProduct );
    const isLoading = useProductsStore( ( state ) => state.isLoading );
    const error = useProductsStore( ( state ) => state.error );
    const fetchProducts = useProductsStore( ( state ) => state.fetchProducts );
    const fetchProductById = useProductsStore( ( state ) => state.fetchProductById );
    const createProduct = useProductsStore( ( state ) => state.createProduct );
    const updateProduct = useProductsStore( ( state ) => state.updateProduct );
    const deleteProduct = useProductsStore( ( state ) => state.deleteProduct );

    return {
        products,
        currentProduct,
        isLoading,
        error,
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
