import { useEffect, useState } from "react";
import { useProducts } from "../features/products/useProducts";
import "./ProductsPage.css"

const ProductsPage = () => {
    const { products, fetchProducts, isLoading, error } = useProducts();

    const [ keyword, setKeyword ] = useState( "" );
    const [ category, setCategory ] = useState( "" );
    const [ sort, setSort ] = useState( "newest" );
    const [ minPrice, setMinPrice ] = useState( "" );
    const [ maxPrice, setMaxPrice ] = useState( "" );

    useEffect( () => {
        const params = {};

        if ( keyword ) params.keyword = keyword;
        if ( category ) params.category = category;
        if ( minPrice ) params.minPrice = minPrice;
        if ( maxPrice ) params.maxPrice = maxPrice;
        if ( sort ) params.sort = sort;

        fetchProducts( params );
    }, [ keyword, category, minPrice, maxPrice, sort ] );

    return (
        <div className="container">

            <h2>محصولات</h2>

            {/* search */ }

            <div>
                <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={ keyword }
                    onChange={ ( e ) => setKeyword( e.target.value ) }
                />
            </div>

            {/* filters */ }

            <div>

                <select value={ category } onChange={ ( e ) => setCategory( e.target.value ) }>
                    <option value="">همه دسته‌ها</option>
                    <option value="mobile">موبایل</option>
                    <option value="laptop">لپتاپ</option>
                    <option value="accessory">لوازم جانبی</option>
                </select>

                <input
                    type="number"
                    placeholder="حداقل قیمت"
                    value={ minPrice }
                    onChange={ ( e ) => setMinPrice( e.target.value ) }
                />

                <input
                    type="number"
                    placeholder="حداکثر قیمت"
                    value={ maxPrice }
                    onChange={ ( e ) => setMaxPrice( e.target.value ) }
                />

                <select value={ sort } onChange={ ( e ) => setSort( e.target.value ) }>
                    <option value="newest">جدیدترین</option>
                    <option value="price_asc">ارزان‌ترین</option>
                    <option value="price_desc">گران‌ترین</option>
                    <option value="rating">بیشترین امتیاز</option>
                </select>

            </div>

            {/* loading */ }

            { isLoading && <p>در حال دریافت محصولات...</p> }

            {/* error */ }

            { error && <p>{ error }</p> }

            {/* products */ }

            <div>
                { products?.map( ( product ) => (
                    <div key={ product._id }>
                        <img src={product.image} alt={product.name}/>
                        <h4>{ product.name }</h4>
                        <p>{ product.price } تومان</p>
                        <p>{ product.category }</p>
                    </div>
                ) ) }
            </div>

        </div>
    );
};

export default ProductsPage;
