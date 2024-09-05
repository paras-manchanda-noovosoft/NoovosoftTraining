import {observer} from 'mobx-react';
import React from 'react';
import {IProduct} from "./interfaces";

const Product = observer( ({product, cartStore}: {product : IProduct, cartStore : any}) => {
    return (
        <>
            <div className="product-item">
                <img src={product.thumbnail} alt={product.product_name} className="product-thumbnail"/>
                <div className="product-details">
                    <h4>
                        {product.product_name} (
                        {product.product_tags.map((tag, index) => (
                            <span style={{paddingLeft: '7px'}} key={index}>{tag}</span>
                        ))}
                        )
                    </h4>
                    <p>Price: ${product.discount} <span className="original-price">(${product.price})</span></p>
                    <p>Category: {product.category}</p>
                    <p>{product.description}</p>
                    <p>Rating: {product.rating}</p>
                    {cartStore.checkCart(product.id)? (
                        <button className="add-cart remove-cart" onClick={()=>  cartStore.addToCart(product)}>
                            Remove from Cart
                        </button>
                    ) : (
                        <button className="add-cart" onClick={() => cartStore.deleteFromCart(product.id)}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </>
    )
});

export default Product;