import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartPage () {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();

  return (
    <div className="page">
      <h1>Cart</h1>

      { items.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Go shopping</Link>
        </p>
      ) : (
        <>
          { items.map( ( item ) => (
            <div key={ item._id } style={ { display: "flex", gap: 12, marginBottom: 16 } }>
              <img
                src={ item.image }
                alt={ item.name }
                style={ { width: 80, height: 80, objectFit: "cover" } }
              />
              <div style={ { flex: 1 } }>
                <h3>{ item.name }</h3>
                <p>{ item.price }</p>
                <input
                  type="number"
                  min="1"
                  value={ item.quantity }
                  onChange={ ( e ) => updateQuantity( item._id, Number( e.target.value ) ) }
                />
              </div>
              <button onClick={ () => removeItem( item._id ) }>Remove</button>
            </div>
          ) ) }
          <h3>Subtotal: { getSubtotal() }</h3>
          <button onClick={ () => navigate( "/checkout" ) }>Proceed to checkout</button>
        </>
      ) }
    </div>
  );
}
