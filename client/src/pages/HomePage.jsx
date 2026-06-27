import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export default function HomePage () {
    const { products, fetchProducts, isLoading, error } = useProducts();
    const { addItem } = useCart();

    useEffect( () => {
        fetchProducts();
    }, [ fetchProducts ] );

    if ( isLoading ) return <div className="page">Loading...</div>;
    if ( error ) return <div className="page">{ error }</div>;

    return (
        <div className="page">
            <h1>Home</h1>
            <div style={ { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 } }>
                { products.map( ( product ) => (
                    <div key={ product._id } style={ { border: "1px solid #ddd", padding: 12 } }>
                        <Link to={ `/products/${ product._id }` }>
                            <img
                                src={ product.image }
                                alt={ product.name }
                                style={ { width: "100%", height: 180, objectFit: "cover" } }
                            />
                            <h3>{ product.name }</h3>
                        </Link>
                        <p>{ product.price }</p>
                        <button onClick={ () => addItem( product, 1 ) }>Add to cart</button>
                    </div>
                ) ) }
            </div>
        </div>
    );
}
