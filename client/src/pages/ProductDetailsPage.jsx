import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiTruck, FiShield } from "react-icons/fi";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export default function ProductDetailsPage () {
    const { id } = useParams();
    const { currentProduct, fetchProductById, isLoading, error } = useProducts();
    const { addItem } = useCart();

    useEffect( () => {
        fetchProductById( id );
    }, [ id, fetchProductById ] );

    if ( isLoading ) return <div className="page">در حال بارگذاری...</div>;
    if ( error ) return <div className="page">{ error }</div>;
    if ( !currentProduct ) return <div className="page">محصول یافت نشد</div>;

    return (
        <div className="page product-details">

            <div className="product-details__grid">

                <div className="product-gallery">
                    <img
                        src={ currentProduct.image }
                        alt={ currentProduct.name }
                    />
                </div>

                <div className="product-info">

                    <h1 className="product-title">
                        { currentProduct.name }
                    </h1>

                    <p className="product-description">
                        { currentProduct.description }
                    </p>

                    <div className="product-meta">

                        <div className="product-price">
                            { Number( currentProduct.price ).toLocaleString( "fa-IR" ) }
                            <span> تومان</span>
                        </div>

                        <div className="product-stock">
                            { currentProduct.countInStock } عدد در انبار
                        </div>

                    </div>

                    <div className="product-benefits">

                        <div>
                            <FiTruck />
                            <span>ارسال سریع</span>
                        </div>

                        <div>
                            <FiShield />
                            <span>ضمانت اصالت</span>
                        </div>

                    </div>

                    <button
                        className="add-to-cart-btn"
                        onClick={ () => addItem( currentProduct, 1 ) }
                    >
                        <FiShoppingCart />
                        افزودن به سبد خرید
                    </button>

                </div>

            </div>

        </div>
    );
}
