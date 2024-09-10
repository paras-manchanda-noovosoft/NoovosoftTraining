import {observer} from 'mobx-react';
import React from 'react';
import {ICartType} from "../types/cartTypes";
import {IProduct} from "../types/productTypes";
import Cartstore from "./Cartstore";

const Product = observer(({product, cartStore,deleteProduct,updateProduct}: { product: IProduct, cartStore: Cartstore,deleteProduct : (a : number)=>void,updateProduct :(a : number)=> void}) => {
    const handleAddCart = () => cartStore.addToCart(product);

    const handleDeleteCart = () => cartStore.deleteFromCart(product.id);

    const deleteFromProduct=()=> deleteProduct(product.id);

    const updateFromProduct=()=> updateProduct(product.id);

    return (
        <>
            <div className="product-item">
                <img src={product.thumbnail ?? ""} alt={product.product_name} className="product-thumbnail"/>
                <div className="product-details">
                    <h4>
                        {product.product_name} (
                        {product.product_tags.length>0 && product.product_tags.map((tag, index) => (
                            <span style={{paddingLeft: '0.6rem'}} key={index}>{tag}</span>
                        ))}
                        )
                    </h4>
                    <p>Price: ${product.discount} <span className="text-styling-gray">(${product.price})</span></p>
                    <p>Category: {product.category}</p>
                    <p>{product.description}</p>
                    {product.rating !== undefined && <p>Rating: {product.rating}</p>}
                    {cartStore.cartStoreDetails.find((item: ICartType) => item.productDetail.id === product.id) ? (
                        <button className="tertiary-button" onClick={handleDeleteCart}>
                            Remove from Cart
                        </button>
                    ) : (
                        <button className="primary-button" onClick={handleAddCart}>
                            Add to Cart
                        </button>
                    )}
                </div>

                <div>
                    <button className={"secondary-button"} style={{margin: "0 0.7rem"}} onClick={updateFromProduct}> Edit </button>
                    <button className={"tertiary-button"} onClick={deleteFromProduct}> Delete </button>
                </div>
            </div>
        </>
    )
});

export default Product;