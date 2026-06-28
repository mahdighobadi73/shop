import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";

export default function ProductCard ( { product } ) {
    const { addItem } = useCart();
    const productId = product._id || product.id;

    return (
        <article className="product-card">
            <Link to={ `/products/${ productId }` } className="product-card__image-wrap">
                <img
                    src={ product.image }
                    alt={ product.name }
                    className="product-card__image"
                    loading="lazy"
                />

                { product.discount ? (
                    <span className="product-card__discount">
                        { product.discount }٪
                    </span>
                ) : null }
            </Link>

            <div className="product-card__body">
                <Link to={ `/products/${ productId }` } className="product-card__title">
                    { product.name }
                </Link>

                { product.category ? (
                    <span className="product-card__category">{ product.category }</span>
                ) : null }

                <div className="product-card__footer">
                    <strong className="product-card__price">
                        { Number( product.price ).toLocaleString( "fa-IR" ) }
                        <span> تومان</span>
                    </strong>

                    <button
                        type="button"
                        className="product-card__add"
                        onClick={ () => addItem( product, 1 ) }
                        aria-label="افزودن به سبد خرید"
                    >
                        <FiShoppingCart />
                    </button>
                </div>

                <Link to={ `/products/${ productId }` } className="product-card__details">
                    <FiEye />
                    مشاهده جزئیات
                </Link>
            </div>
        </article>
    );
}
