import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { useProducts } from "../features/products/useProducts";
import ProductCard from "../features/products/ProductCard";

export default function HomePage () {
    const { products, fetchProducts, isLoading, error } = useProducts();

    useEffect( () => {
        fetchProducts();
    }, [ fetchProducts ] );

    const featuredProducts = products.slice( 0, 8 );

    if ( isLoading ) {
        return (
            <div className="page">
                <div className="product-grid">
                    { Array.from( { length: 6 } ).map( ( _, index ) => (
                        <div key={ index } className="skeleton-card" />
                    ) ) }
                </div>
            </div>
        );
    }

    if ( error ) {
        return <div className="page error-box">{ error }</div>;
    }

    return (
        <div className="page home-page">
            <section className="hero">
                <div>
                    <span className="hero__eyebrow">خرید سریع و هوشمند</span>
                    <h1>فروشگاه آنلاین مدرن برای تجربه خرید بهتر</h1>
                    <p>
                        محصولات منتخب، ارسال سریع، رابط کاربری ساده و تجربه‌ای نزدیک
                        به فروشگاه‌های حرفه‌ای.
                    </p>

                    <Link to="/products" className="hero__cta">
                        مشاهده محصولات
                        <FiArrowLeft />
                    </Link>
                </div>
            </section>

            <section className="benefits">
                <div className="benefit-card">
                    <FiTruck />
                    <span>ارسال سریع</span>
                </div>
                <div className="benefit-card">
                    <FiShield />
                    <span>ضمانت کیفیت</span>
                </div>
                <div className="benefit-card">
                    <FiRefreshCw />
                    <span>بازگشت آسان</span>
                </div>
            </section>

            <section className="section-head">
                <div>
                    <h2>محصولات منتخب</h2>
                    <p>پیشنهادهای جذاب برای خرید امروز</p>
                </div>

                <Link to="/products">
                    همه محصولات
                    <FiArrowLeft />
                </Link>
            </section>

            <div className="product-grid">
                { featuredProducts.map( ( product ) => (
                    <ProductCard key={ product._id || product.id } product={ product } />
                ) ) }
            </div>
        </div>
    );
}
