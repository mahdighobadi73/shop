import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";

export default function CheckoutPage () {
    const navigate = useNavigate();
    const { items, getSubtotal, clearCart } = useCart();
    const { createOrder, isLoading, error } = useOrders();

    const handlePlaceOrder = async () => {
        const payload = {
            orderItems: items.map( ( item ) => ( {
                product: item._id,
                name: item.name,
                qty: item.quantity,
                price: item.price,
                image: item.image,
            } ) ),
            shippingAddress: {
                address: "N/A",
                city: "N/A",
                postalCode: "N/A",
                country: "N/A",
            },
            paymentMethod: "cod",
            itemsPrice: getSubtotal(),
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: getSubtotal(),
        };

        await createOrder( payload );
        clearCart();
        navigate( "/orders" );
    };

    return (
        <div className="page">
            <h1>Checkout</h1>
            <p>Total: { getSubtotal() }</p>
            { error ? <p>{ error }</p> : null }
            <button onClick={ handlePlaceOrder } disabled={ isLoading || items.length === 0 }>
                { isLoading ? "Placing order..." : "Place order" }
            </button>
        </div>
    );
}
