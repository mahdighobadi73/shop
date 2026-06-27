import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useOrders } from "../../hooks/useOrders";
import { useAuth } from "../../hooks/useAuth";

export default function AdminPage () {
    const { user } = useAuth();
    const { products, fetchProducts, createProduct, updateProduct, deleteProduct } =
        useProducts();
    const { orders, fetchAdminOrders, updateOrder } = useOrders();

    const [ form, setForm ] = useState( {
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        countInStock: "",
    } );

    useEffect( () => {
        fetchProducts();
        fetchAdminOrders();
    }, [ fetchProducts, fetchAdminOrders ] );

    const handleCreate = async ( e ) => {
        e.preventDefault();
        await createProduct( {
            ...form,
            price: Number( form.price ),
            countInStock: Number( form.countInStock ),
        } );
        setForm( {
            name: "",
            price: "",
            image: "",
            description: "",
            category: "",
            countInStock: "",
        } );
    };

    if ( user?.role !== "admin" ) return <div className="page">Access denied</div>;

    return (
        <div className="page">
            <h1>Admin</h1>

            <section>
                <h2>Create Product</h2>
                <form onSubmit={ handleCreate } style={ { display: "grid", gap: 12, maxWidth: 520 } }>
                    <input
                        placeholder="Name"
                        value={ form.name }
                        onChange={ ( e ) => setForm( { ...form, name: e.target.value } ) }
                    />
                    <input
                        placeholder="Price"
                        type="number"
                        value={ form.price }
                        onChange={ ( e ) => setForm( { ...form, price: e.target.value } ) }
                    />
                    <input
                        placeholder="Image"
                        value={ form.image }
                        onChange={ ( e ) => setForm( { ...form, image: e.target.value } ) }
                    />
                    <input
                        placeholder="Category"
                        value={ form.category }
                        onChange={ ( e ) => setForm( { ...form, category: e.target.value } ) }
                    />
                    <input
                        placeholder="Count In Stock"
                        type="number"
                        value={ form.countInStock }
                        onChange={ ( e ) => setForm( { ...form, countInStock: e.target.value } ) }
                    />
                    <textarea
                        placeholder="Description"
                        value={ form.description }
                        onChange={ ( e ) => setForm( { ...form, description: e.target.value } ) }
                    />
                    <button type="submit">Create</button>
                </form>
            </section>

            <section style={ { marginTop: 32 } }>
                <h2>Products</h2>
                { products.map( ( product ) => (
                    <div key={ product._id } style={ { display: "flex", gap: 12, marginBottom: 12 } }>
                        <div style={ { flex: 1 } }>
                            { product.name } - { product.price }
                        </div>
                        <button onClick={ () => updateProduct( product._id, product ) }>Quick Save</button>
                        <button onClick={ () => deleteProduct( product._id ) }>Delete</button>
                    </div>
                ) ) }
            </section>

            <section style={ { marginTop: 32 } }>
                <h2>Orders</h2>
                { orders.map( ( order ) => (
                    <div key={ order._id } style={ { display: "flex", gap: 12, marginBottom: 12 } }>
                        <div style={ { flex: 1 } }>
                            { order._id } - { order.status }
                        </div>
                        <button onClick={ () => updateOrder( order._id, { status: "processing" } ) }>
                            Processing
                        </button>
                        <button onClick={ () => updateOrder( order._id, { status: "shipped" } ) }>
                            Shipped
                        </button>
                        <button onClick={ () => updateOrder( order._id, { status: "delivered" } ) }>
                            Delivered
                        </button>
                    </div>
                ) ) }
            </section>
        </div>
    );
}
