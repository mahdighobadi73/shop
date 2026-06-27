import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore.js'
import Button from '../ui/Button.jsx'

export default function ProductCard ( { product } ) {
    const addItem = useCartStore( ( state ) => state.addItem )

    return (
        <article className="product-card">
            <Link to={ `/products/${ product.id }` } className="product-image-wrap">
                <img src={ product.image } alt={ product.name } className="product-image" />
            </Link>

            <div className="product-content">
                <h3>{ product.name }</h3>
                <p>{ product.category }</p>
                <strong>{ product.price.toLocaleString( 'fa-IR' ) } تومان</strong>

                <div className="product-actions">
                    <Link to={ `/products/${ product.id }` } className="link-btn">
                        مشاهده
                    </Link>
                    <Button onClick={ () => addItem( product, 1 ) }>افزودن</Button>
                </div>
            </div>
        </article>
    )
}
