import React, {useContext, useEffect} from 'react';
import CategoryDropDown from "./CategoryDropDown";
import Product from './Product';
import {IProduct} from "../types/productTypes";
import {observer} from "mobx-react";
import { useRouterStore } from 'mobx-state-router';
import {RootContext} from "../App";


const HomePage = observer(() => {
    const routerStore = useRouterStore();
    const baseProductUrl: string = 'https://dummyjson.com/products';
    const searchBaseUrl: string = 'https://dummyjson.com/products/search?q=';
    const rootStore=useContext(RootContext);
    const productStore=rootStore.productstore;
    const cartStore = rootStore.cartstore;

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

    const deleteProduct=(id : number)=>{
        productStore.deleteProduct(id);
    }

    const handleSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
        productStore.setSearchBoxData(e.target.value);
    }

    const handleUpdateProduct=(id : number)=>{
        routerStore.goTo('NewProductPage', { params : {productId: id.toString()}});
    }
    return (
        <>
            <div className="search-bar">
                <input type="text" placeholder="Search ..." className="search-box" onChange={handleSearchData}/>
                {productStore.categoryList !== undefined &&
                    <CategoryDropDown categoryData={productStore.categoryList} onSelect={handleCategoryChange}/>}
                <div className="user-cart">
                    <p>{productStore.user}</p>
                    <button  onClick={()=> routerStore.goTo('CartPage') }> User Cart {cartStore.cartStoreDetails.length}  </button>
                </div>
            </div>

            <div className="flex-container-justify-right">
                <button className={"primary-button"} onClick={()=> routerStore.goTo('NewProductPage',{params : {productId : "+"}})}>Add Product</button>
            </div>
            {productStore.productsDetails?.length && productStore.productsDetails.map((product: IProduct) => {
                return <Product product={product} key={product.id} cartStore={cartStore} deleteProduct={deleteProduct} updateProduct={handleUpdateProduct}/>
            })}
        </>
    );
});

export default HomePage;