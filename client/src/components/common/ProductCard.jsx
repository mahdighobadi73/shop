import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye, FiHeart } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import "./ProductCard.css";

export default function ProductCard ( { product, loading = false } ) {
    const { addItem } = useCart();

    const [ liked, setLiked ] = useState( false );
    const [ hovered, setHovered ] = useState( false );

    if ( loading ) return <ProductCardSkeleton />;

    const productId = product?._id ?? product?.id;

    const handleAdd = () => addItem( product, 1 );

    return (
        <article
            className="product-card"
            onMouseEnter={ () => setHovered( true ) }
            onMouseLeave={ () => setHovered( false ) }
        >

            {/* BADGE */ }
            { product?.discount > 0 && (
                <div className="product-card__badge">
                    %{ product.discount }
                </div>
            ) }

            {/* WISHLIST */ }
            <button
                className={ `product-card__favorite ${ liked ? "is-active" : "" }` }
                onClick={ () => setLiked( prev => !prev ) }
            >
                <FiHeart />
            </button>

            {/* IMAGE */ }
            <Link to={ `/products/${ productId }` } className="product-card__image-wrap">
                <img
                    src={ hovered && product?.imageHover ? product.imageHover : product.image }
                    alt={ product?.name }
                    className="product-card__image"
                />
            </Link>

            {/* BODY */ }
            <div className="product-card__body">

                <span className="product-card__category">
                    { product?.category }
                </span>

                <Link to={ `/products/${ productId }` } className="product-card__title">
                    { product?.name }
                </Link>

                <div className="product-card__price">
                    { Number( product?.price || 0 ).toLocaleString( "fa-IR" ) } تومان
                </div>

                {/* ACTIONS */ }
                <div className="product-card__actions">

                    <button className="btn-cart" onClick={ handleAdd }>
                        <FiShoppingCart />
                        افزودن
                    </button>

                    <Link to={ `/products/${ productId }` } className="btn-view">
                        <FiEye />
                    </Link>

                </div>
            </div>
        </article>
    );
}