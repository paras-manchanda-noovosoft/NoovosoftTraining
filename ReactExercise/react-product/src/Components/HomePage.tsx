import React, {useEffect} from 'react';
import CategoryDropDown from "./CategoryDropDown";
import Product from './Product';
import {IProduct} from "../types/productTypes";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import product from "./Product";

const HomePage = observer(({cartStore, productStore}: { cartStore: any, productStore: any }) => {
    const navigate = useNavigate();
    const baseProductUrl: string = 'https://dummyjson.com/products';
    const searchBaseUrl: string = 'https://dummyjson.com/products/search?q=';

    useEffect(() => {
        productStore.setProductDetails();
    }, [productStore.fetchUrl]);

    useEffect(() => {
        productStore.setCategoryDetails();
        productStore.setUserDetails();
    }, []);

    useEffect(() => {
        if (productStore.search?.length > 0) {
            const timer: any = setTimeout(() => {
                productStore.setFetchUrl(`${searchBaseUrl}${productStore.search}`);
            }, 2000);

            return () => {
                clearTimeout(timer)
            }
        }

    }, [productStore.search]);


    const handleCategoryChange = (category: string) => {
        if (category === 'all') {
            productStore.setFetchUrl(baseProductUrl);
        } else {
            const newUrl: string = baseProductUrl + "/category/" + category;
            productStore.setFetchUrl(newUrl);
        }
    };

    const handleSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {

        productStore.setSearchBoxData(e.target.value);
    }
    return (
        <>
            <div className="search-bar">
                <input type="text" placeholder="Search ..." className="search-box" onChange={handleSearchData}/>
                {productStore.categoryList !== undefined &&
                    <CategoryDropDown categoryData={productStore.categoryList} onSelect={handleCategoryChange}/>}
                <div className="user-cart">
                    <p>{productStore.user}</p>
                    <button className="user-cart-quantity-button" onClick={()=> navigate('/cart') }> User Cart {cartStore.cartStoreDetails.length}  </button>
                </div>
            </div>
            {productStore.productsDetails !== undefined && productStore.productsDetails.map((product: IProduct, ind: number) => {
                return <Product product={product} key={product.id} cartStore={cartStore}/>
            })}
        </>
    );
});

export default HomePage;