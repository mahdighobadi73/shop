import { useEffect } from "react";
import { useOrders } from "../features/orders/useOrders";

export default function OrdersPage () {
    const { orders, fetchMyOrders, isLoading, error } = useOrders();

    useEffect( () => {
        fetchMyOrders();
    }, [ fetchMyOrders ] );

    if ( isLoading ) return <div className="page">Loading...</div>;
    if ( error ) return <div className="page">{ error }</div>;

    return (
        <div className="page">
            <h1>My Orders</h1>
            { orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                orders.map( ( order ) => (
                    <div key={ order._id }>
                        <p>Order ID: { order._id }</p>
                        <p>Status: { order.status }</p>
                        <p>Total: { order.totalPrice }</p>
                    </div>
                ) )
            ) }
        </div>
    );
}
