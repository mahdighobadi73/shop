import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export default function ProductDetailsPage () {
    const { id } = useParams();
    const { currentProduct, fetchProductById, isLoading, error } = useProducts();
    const { addItem } = useCart();

    useEffect( () => {
        fetchProductById( id );
    }, [ id, fetchProductById ] );

    if ( isLoading ) return <div className="page">Loading...</div>;
    if ( error ) return <div className="page">{ error }</div>;
    if ( !currentProduct ) return <div className="page">Product not found</div>;

    return (
        <div className="page">
            <h1>{ currentProduct.name }</h1>
            <img
                src={ currentProduct.image }
                alt={ currentProduct.name }
                style={ { width: "100%", maxWidth: 480, height: 320, objectFit: "cover" } }
            />
            <p>{ currentProduct.description }</p>
            <p>Price: { currentProduct.price }</p>
            <p>Stock: { currentProduct.countInStock }</p>
            <button onClick={ () => addItem( currentProduct, 1 ) }>Add to cart</button>
        </div>
    );
}
