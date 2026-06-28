import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../hooks/useCart";

export default function CartPage () {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();

  if ( items.length === 0 ) {
    return (
      <div className="page empty-cart">
        <h2>سبد خرید خالی است</h2>
        <Link to="/products" className="go-shopping">
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">

      <h1>سبد خرید</h1>

      <div className="cart-grid">

        <div className="cart-items">

          { items.map( ( item ) => (
            <div key={ item._id } className="cart-item">

              <img
                src={ item.image }
                alt={ item.name }
              />

              <div className="cart-item-info">

                <h3>{ item.name }</h3>

                <div className="cart-item-price">
                  { Number( item.price ).toLocaleString( "fa-IR" ) }
                  <span> تومان</span>
                </div>

                <input
                  type="number"
                  min="1"
                  value={ item.quantity }
                  onChange={ ( e ) =>
                    updateQuantity(
                      item._id,
                      Number( e.target.value )
                    )
                  }
                />

              </div>

              <button
                className="remove-item"
                onClick={ () => removeItem( item._id ) }
              >
                <FiTrash2 />
              </button>

            </div>
          ) ) }

        </div>

        <div className="cart-summary">

          <h3>خلاصه سفارش</h3>

          <div className="summary-row">
            <span>جمع کالاها</span>
            <span>
              { getSubtotal().toLocaleString( "fa-IR" ) } تومان
            </span>
          </div>

          <button
            className="checkout-btn"
            onClick={ () => navigate( "/checkout" ) }
          >
            ادامه فرآیند خرید
          </button>

        </div>

      </div>

    </div>
  );
}
