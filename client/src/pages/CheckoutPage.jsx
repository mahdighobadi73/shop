import { useNavigate } from "react-router-dom";
import { useCart } from "../features/cart/useCart";
import { useOrders } from "../features/orders/useOrders";

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
        <div className="page checkout-page">

            <h1>تایید سفارش</h1>

            <div className="checkout-summary">

                <div className="summary-row">
                    <span>جمع کالاها</span>
                    <span>
                        { getSubtotal().toLocaleString( "fa-IR" ) } تومان
                    </span>
                </div>

                { error && (
                    <p className="checkout-error">{ error }</p>
                ) }

                <button
                    className="place-order-btn"
                    onClick={ handlePlaceOrder }
                    disabled={ isLoading || items.length === 0 }
                >
                    { isLoading ? "در حال ثبت سفارش..." : "ثبت سفارش" }
                </button>

            </div>

        </div>
    );
}
