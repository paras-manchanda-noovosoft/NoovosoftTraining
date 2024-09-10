import {observer} from 'mobx-react';
import React from 'react';
import {ICartType} from "../types/cartTypes";
import {IProduct} from "../types/productTypes";
import Cartstore from "./Cartstore";

const Product = observer(({product, cartStore,deleteProduct,updateProduct}: { product: IProduct, cartStore: Cartstore,deleteProduct : (a : number)=>void,updateProduct :(a : number)=> void}) => {
    const handleAddCart = () => {
        cartStore.addToCart(product);
    }
    const handleDeleteCart = () => {
        cartStore.deleteFromCart(product.id);
    }

    const deleteFromProduct=()=>{
        deleteProduct(product.id);
    }

    const updateFromProduct=()=>{
        updateProduct(product.id);
    }

    return (
        <>
            <div className="product-item">
                <img src={ product.thumbnail!==undefined ? product.thumbnail:""} alt={product.product_name} className="product-thumbnail"/>
                <div className="product-details">
                    <h4>
                        {product.product_name} (
                        {product.product_tags.length>0 && product.product_tags.map((tag, index) => (
                            <span style={{paddingLeft: '7px'}} key={index}>{tag}</span>
                        ))}
                        )
                    </h4>
                    <p>Price: ${product.discount} <span className="original-price">(${product.price})</span></p>
                    <p>Category: {product.category}</p>
                    <p>{product.description}</p>
                    {product.rating !== undefined && <p>Rating: {product.rating}</p>}
                    {cartStore.cartStoreDetails.find((item: ICartType) => item.productDetail.id === product.id) ? (
                        <button className="add-cart remove-cart" onClick={handleDeleteCart}>
                            Remove from Cart
                        </button>
                    ) : (
                        <button className="add-cart" onClick={handleAddCart}>
                            Add to Cart
                        </button>
                    )}
                </div>

                <div>
                    <button style={{margin : "0px 10px"}} onClick={updateFromProduct}> Edit the Product </button>
                    <button onClick={deleteFromProduct}> Delete the Product</button>
                </div>
            </div>
        </>
    )
});

export default Product;